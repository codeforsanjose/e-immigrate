import xlsxFile, { Row } from 'read-excel-file/node';
import { LanguageOptionCodes, LanguageOptions, WorkshopTitle } from '../LanguageOptions.js';
import { getFullDataPath } from '../features/data/locator.js';
import { sendRequest } from './helpers/sendRequest.js';
import { forEachAsync } from '../features/iterators/forEachAsync.js';
import { logger } from '../features/logging/logger.js';
import { z } from 'zod';
const RowSchema = z.object({
    id: z.union([z.string(), z.number()]),
    slug: z.string(),
    category: z.string(),
    text: z.string(),
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

    #allLanguages: Set<LanguageOptionCodes>;
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
function loadQuestionSheet(rows: Array<Row>, language: LanguageOptionCodes) {
    type RowData = z.infer<typeof RowSchema>;

    const data: Array<RowData> = [];
    rows.forEach((row) => {
        const parseResult = loadRow(row);
        if (!parseResult.success) {
            logger.error(parseResult.error, 'Failed to extract row data');
            return;
        }
        data.push({
            ...(parseResult.data),
            id: `${parseResult.data.id}`,
        });
    });
    data.shift();

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
        }
        function appendFollowupQuestion(orig: string | null | undefined, next: string): AppendFollowupResult {
            if (orig == null || orig === '') {
                return {
                    didAdd: true,
                    value: next,
                }
            }
            const existingChildren = orig.split(',');
            if (existingChildren.includes(next)) {
                return {
                    didAdd: false,
                    value: orig,
                }
            }
            return {
                didAdd: true,
                value: orig + `,${next}`,
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
        })
        if (!didChange) break;
    }

    const partiallyMissing = parentSlugManager.getPartiallyMissingSlugs();
    if (partiallyMissing != null) {
        logger.error({
            slugs: partiallyMissing,
        }, 'partially missing')
    }
    const fullyMissing = parentSlugManager.getFullyMissingSlugs();
    if (fullyMissing != null) {
        logger.error({
            slugs: fullyMissing,
        }, 'fully missing')
    }
    
    return data;
}
async function generateQuestionnaires() {
    await forEachAsync(LanguageOptions, async (language, idx) => {
        const rows = await xlsxFile(getFullDataPath('./Questionnaire.xlsx'), {
            sheet: idx + 1,
        });
        const data = loadQuestionSheet(rows, language.code);
        
        await sendRequest({
            url: 'http://localhost:5000/api/questionnaires/add',
            method: 'POST',
            body: JSON.stringify({
                title: WorkshopTitle,
                language: language.code,
                questions: data,
            }),
        });
    });
}

await generateQuestionnaires();
