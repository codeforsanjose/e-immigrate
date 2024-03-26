import xlsxFile, { Row } from 'read-excel-file/node';
import { z } from 'zod';
import { ExcelLanguageSheetMap, LanguageOptionCodes, LanguageOptions, WorkshopTitle } from '../../LanguageOptions.js';
import { scopedLogger } from '../logging/logger.js';
import { Questionnaires } from '../../models/questionnaires.js';
import { Readable } from 'stream';


const loggers = {
    loadQuestionSheet: scopedLogger('loadQuestionSheet'),
    loadQuestionnaireXlsxIntoDB: scopedLogger('loadQuestionnaireXlsxIntoDB'),
};


const RowSchema = z.object({
    id: z.union([z.string(), z.number()]),
    slug: z.string(),
    category: z.string(),
    text: z.string().nullable(),
    questionType: z.string(),
    answerSelections: z.string().nullable(),
    answerValues: z.string().nullable(),
    required: z.boolean(),
    followUpQuestionSlug: z.string().nullable(),
    parentQuestionSlug: z.string().nullable(),
});

function loadRow(row: Row) {
    return RowSchema.safeParse({
        id: row[0],
        slug: row[1],
        category: row[2],
        text: row[3],
        questionType: row[4],
        answerSelections: row[5],
        answerValues: row[6],
        required: row[7] === 'Yes',
        followUpQuestionSlug: row[8] ?? null,
        parentQuestionSlug: row[9] ?? null,
    });
}

type LanguageChildPair = [language: LanguageOptionCodes, source: string];

function getOrCreate<T>(map: Map<string, Set<T>>, slug: string) {
    const current = map.get(slug);
    if (current != null) return current;
    const value = new Set<T>();
    map.set(slug, value);
    return value;
}
class SlugSourcePair {
    parentSlugs: Map<string, Set<LanguageOptionCodes>>;
    parentSlugSources: Map<string, Set<LanguageChildPair>>;
    constructor() {
        this.parentSlugs = new Map<string, Set<LanguageOptionCodes>>();
        this.parentSlugSources = new Map<string, Set<LanguageChildPair>>();
    }

    add(parentSlug: string, childSlug: string, language: LanguageOptionCodes) {
        getOrCreate(this.parentSlugSources, parentSlug).add([language, childSlug]);
        getOrCreate(this.parentSlugs, parentSlug).add(language);
    }
}
class ParentSlugKnowledgeManager {
    unknown: SlugSourcePair;
    known: SlugSourcePair;
    readonly #allLanguages: Set<LanguageOptionCodes>;

    constructor() {
        this.unknown = new SlugSourcePair();
        this.known = new SlugSourcePair();
        this.#allLanguages = new Set<LanguageOptionCodes>();
    }

    
    addKnown(parentSlug: string, childSlug: string, language: LanguageOptionCodes) {
        this.#allLanguages.add(language);
        this.known.add(parentSlug, childSlug, language);
    }

    addUnknown(parentSlug: string, childSlug: string, language: LanguageOptionCodes) {
        this.#allLanguages.add(language);
        this.unknown.add(parentSlug, childSlug, language);
    }

    
    getPartiallyMissingSlugs() {
        const slugs = Array.from(this.unknown.parentSlugs.keys()).filter(key => {
            return this.known.parentSlugs.has(key);
        });
        if (slugs.length === 0) return;
        type PartiallyMissingReport = Record<string, {
            missingIn: Array<LanguageChildPair>;
            presentIn: Array<LanguageChildPair>;
        }>;
        return slugs.reduce<PartiallyMissingReport>((prev, slug) => {
            const knownSources = Array.from(this.known.parentSlugSources.get(slug) ?? new Set<LanguageChildPair>());
            const unknownSources = Array.from(this.unknown.parentSlugSources.get(slug) ?? new Set<LanguageChildPair>());
            return {
                ...prev,
                [slug]: {
                    missingIn: unknownSources,
                    presentIn: knownSources,
                },
            };
        }, {});
    }

    getFullyMissingSlugs() {
        const slugs = Array.from(this.unknown.parentSlugs.keys()).filter(key => {
            return !this.known.parentSlugs.has(key);
        });
        if (slugs.length === 0) return;
        type PartiallyMissingReport = Record<string, Array<LanguageChildPair>>;
        return slugs.reduce<PartiallyMissingReport>((prev, slug) => {
            const unknownSources = Array.from(this.unknown.parentSlugSources.get(slug) ?? new Set<LanguageChildPair>());
            return {
                ...prev,
                [slug]: unknownSources,
            };
        }, {});
    }
}
type HeaderRowValidationResult = 
| { success: true, }
| { 
    success: false;
    errorMessage: string;
};
function validateHeaderRow(row: Row): HeaderRowValidationResult {
    const validHeaders = [
        '#(id)',
        'Slug',
        'Category',
        ['Text', 'Text Translation'],
        'QuestionType',
        'AnswerSelections',
        'AnswerSelectionsValues',
        'Required?',
        'FollowUpQuestionSlug',
        'ParentQuestionSlug',
    ];
    let errorMessage = '';
    if (row.length !== validHeaders.length) {
        errorMessage = 'invalid column name row';
    }
    else {
        for (let i = 0; i < validHeaders.length; i++) {
            const validHeader = validHeaders[i];
            const actual = row[i].toString();
            if (typeof validHeader === 'string') {
                if (actual !== validHeader) {
                    errorMessage = `invalid column name: ${actual}.  Expected ${validHeader}`;
                }
            }
            else if (Array.isArray(validHeader)) {
                if (!validHeader.includes(actual)) {
                    errorMessage = `invalid column name: ${actual}. Expected any of [${validHeader.join(', ')}]`;
                }
            }
            else {
                validHeader satisfies never;
                throw new Error('Unexpected validation header');
            }
        }
    }
    if (errorMessage != null && errorMessage !== '') {
        return {
            success: false,
            errorMessage,
        };
    }
    return {
        success: true,
    };
}
export function loadQuestionSheet(rows: Array<Row>, language: LanguageOptionCodes) {
    const logger = loggers.loadQuestionSheet;
    type RowData = z.infer<typeof RowSchema>;
    
    // validate the header row
    const validationResult = validateHeaderRow(rows[0]);
    if (!validationResult.success) {
        logger.error({
            language,
            message: validationResult.errorMessage,
        });
        throw new Error(validationResult.errorMessage);
    }

    const data: Array<RowData> = [];
    rows.forEach((row, index) => {
        if (index === 0) return;

        const parseResult = loadRow(row);
        if (!parseResult.success) {
            logger.error({
                slug: row[1],
                parseError: parseResult.error,
            }, 'Failed to extract row data');
            return;
        }
        data.push({
            ...(parseResult.data),
            id: `${parseResult.data.id}`,
        });
    });

    type IdMap = Record<string, RowData>;
    const questionMap = data.reduce<IdMap>((prev, cur) => {
        return {
            ...prev,
            [cur.slug]: cur,
        };
    }, {});

    const radioWithFollowupType = 'radioWithFollowUp' as const;
    const radioType = 'radio' as const;
 

    const parentSlugManager = new ParentSlugKnowledgeManager();
    function applyFollowupQuestions() {
        let anyChanges = false;
        type AppendFollowupResult = {
            didAdd: boolean;
            value: string;
        };
        function appendFollowupQuestion(orig: string | null | undefined, next: string): AppendFollowupResult {
            if (orig == null || orig === '') {
                return {
                    didAdd: true,
                    value: next,
                };
            }
            const existingChildren = orig.split(',');
            if (existingChildren.includes(next)) {
                return {
                    didAdd: false,
                    value: orig,
                };
            }
            return {
                didAdd: true,
                value: `${orig},${next}`,
            };
        }
        function convertToFollowup(parentQuestion: RowData, childQuestion: RowData) {
            if (parentQuestion.questionType === radioWithFollowupType || parentQuestion.questionType === radioType) {
                parentQuestion.questionType = radioWithFollowupType;
                const appendResult = appendFollowupQuestion(parentQuestion.followUpQuestionSlug, childQuestion.slug);
                const {
                    didAdd,
                    value,
                } = appendResult;
                parentQuestion.followUpQuestionSlug = value;
                if (didAdd) {
                    anyChanges = true;
                }
                return;
            }
            else {
                logger.error({
                    language,
                    parentQuestion,
                    childQuestion,
                }, "unexpected parent question");
                return;
            }
        }
        data.forEach(dataRecord => {
            const parentQuestionId = dataRecord.parentQuestionSlug;
            if (parentQuestionId == null || parentQuestionId === '') return;
            const parentQuestion = questionMap[parentQuestionId];
            if (parentQuestion == null) {
                parentSlugManager.addUnknown(parentQuestionId, dataRecord.slug, language);
                dataRecord.parentQuestionSlug = '';
                return;
            }
            else {
                parentSlugManager.addKnown(parentQuestionId, dataRecord.slug, language);
            }
            convertToFollowup(parentQuestion, dataRecord);
        });
        return anyChanges;
    }
    
    while (true) {
        const didChange = applyFollowupQuestions();
        console.log({
            language,
            didChange,
        });
        if (!didChange) break;
    }

    const partiallyMissing = parentSlugManager.getPartiallyMissingSlugs();
    if (partiallyMissing != null) {
        logger.error({
            slugs: partiallyMissing,
        }, 'partially missing');
    }
    const fullyMissing = parentSlugManager.getFullyMissingSlugs();
    if (fullyMissing != null) {
        logger.error({
            slugs: fullyMissing,
        }, 'fully missing');
    }
    
    return data;
}

export async function importExcelQuestionSheet(config: {
    title: string;
    language: string;
    questions: Array<{
        id: string | number;
        required: boolean;
        slug: string;
        category: string;
        text: string | null;
        questionType: string;
        answerSelections: string | null;
        answerValues: string | null;
        followUpQuestionSlug: string | null;
        parentQuestionSlug: string | null;
    }>;
}) {
    const logger = loggers.loadQuestionnaireXlsxIntoDB;
    const {
        language,
        questions,
        title,    
    } = config;

    const result = await Questionnaires.findOne({ title, language });
    if (result != null) {
        await Questionnaires.findByIdAndDelete({
            _id: result._id,
        });
        logger.debug({
            id: result._id,
            title,
            language,
        }, 'questionnaire deleted');
    }
    await Questionnaires.insertMany({
        title,
        language,
        questions,
    });
    logger.debug({
        title,
        language, 
    }, 'questionnaire inserted');
}




/**
 * load questionnaire excel file into objects in the Questionnaires collection
 * excelFileContent - Node Buffer containing the excel file, this assumes must be formmated
 *                    with proper sheets for each langauge
 * returns; a promise that resolves when operaiton is done
 * */
export async function loadQuestionnaireXlsxIntoDB(excelFileContent: Buffer, title = WorkshopTitle) {
    const logger = loggers.loadQuestionnaireXlsxIntoDB;

    const questionnairePromises = LanguageOptions.map(async (language, idx) => {
        // find the name of the sheet in the excel file
        const excelSheetName = ExcelLanguageSheetMap[language.code];

        // fail if the mapping couldnt be found
        if (excelSheetName == null) {
            logger.error({
                code: language.code,
            }, `Failed to find a mapping from 'code' to 'sheet name'`);
            return;
        }

        const stream = new Readable();
        stream.push(excelFileContent);
        stream.push(null);
        const rows = await xlsxFile(stream, {
            // sheet: idx + 1,
            sheet: excelSheetName,
        });
        return loadQuestionSheet(rows, language.code);
    });
    const questionnaires = await Promise.all(questionnairePromises);
    const insertPromises = LanguageOptions.map(async (language, idx) => {
        const questions = questionnaires[idx];
        if (questions == null) return;
        await importExcelQuestionSheet({
            language: language.code,
            title,
            questions,
        });
    });
    await Promise.all(insertPromises);
}