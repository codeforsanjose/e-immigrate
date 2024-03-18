/**
 * this module exports interfaces for taking in excel spreadesheets and loaidng into objects in the database
 * */
import xlsxFile from 'read-excel-file/node';
import { Questionnaires } from '../models/questionnaires.js';
import { TranslatedContent } from '../models/translatedContent.js';
import { LanguageOptionCodes, LanguageOptions, WorkshopTitle } from '../LanguageOptions.js';
import { Readable } from 'stream';
import { Types } from 'mongoose';
import { ArrayElementOf } from '../types/ArrayElementOf.js';
import { Row } from 'read-excel-file';

/**
 * load questionnaire excel file into objects in the Questionnaires collection
 * excelFileContent - Node Buffer containing the excel file, this assumes must be formmated
 *                    with proper sheets for each langauge
 * returns; a promise that resolves when operaiton is done
 * */
export async function loadQuestionnaireXlsxIntoDB(excelFileContent: Buffer, title = WorkshopTitle) {
    const questionnairePromises = LanguageOptions.map((language, idx) => {
        const stream = new Readable();
        stream.push(excelFileContent);
        stream.push(null);
        return xlsxFile(stream, {
            sheet: idx + 1,
        }).then((rows) => {
            type Row = {
                id: unknown;
                slug: unknown;
                category: unknown;
                text: unknown;
                questionType: unknown;
                answerSelections: unknown;
                answerValues: unknown;
                required: boolean;
                followUpQuestionSlug: unknown | null;
                parentQuestionSlug: unknown | null;
            };
            const data: Array<Row> = [];
            rows.forEach((row, id) => {
                if (id === 0) {
                    let errorMessage = '';
                    const validHeaders = [
                        '#(id)',
                        'Slug',
                        'Category',
                        'Text',
                        'QuestionType',
                        'AnswerSelections',
                        'AnswerSelectionsValues',
                        'Required?',
                        'FollowUpQuestionSlug',
                        'ParentQuestionSlug',
                    ];
                    if (row.length !== validHeaders.length) {
                        errorMessage = 'invalid column name row';
                    } else {
                        for (let i = 0; i < validHeaders.length; i++) {
                            if (row[i] !== validHeaders[i]) {
                                errorMessage = 'invalid column name: ' + row[i];
                            }
                        }
                    }
                    if (errorMessage) {
                        throw new Error(errorMessage);
                    }
                    return;
                }

                data.push({
                    id: row[0],
                    slug: row[1],
                    category: row[2],
                    text: row[3],
                    questionType: row[4],
                    answerSelections: row[5],
                    answerValues: row[6],
                    required: row[7] === 'Yes' ? true : false,
                    followUpQuestionSlug: row[8] ? row[8] : null,
                    parentQuestionSlug: row[9] ? row[9] : null,
                });
            });
            return data;
        });
    });
    const questionnaires = await Promise.all(questionnairePromises);
    const insertPromises = LanguageOptions.map(async (language, idx) => {
        const questions = questionnaires[idx];
        function insertNewQuestionnaire() {
            return Questionnaires.insertMany({
                title,
                language: language.code,
                questions,
            });
        }

        function removeExistingQuestionnaires(_id: Types.ObjectId) {
            return Questionnaires.findByIdAndDelete({ _id });
        }

        const result = await Questionnaires.find({ title, language: language.code });
        if (result.length !== 0) {
            await removeExistingQuestionnaires(result[0]._id);
            return await insertNewQuestionnaire();
        } else {
            return await insertNewQuestionnaire();
        }
    });
    return await Promise.all(insertPromises);
}

type Cell = (ArrayElementOf<Row>) & (string | number);
function isValidRecordCell(value: unknown): value is (string | number) {
    return typeof value === 'string' || typeof value === 'number';
}
/**
 * load translation excel file into objects in the TranslatedContent collection
 * excelFileContent - Node Buffer containing the excel file, this assumes must be formmated
 *                    with proper translation sheet format
 * returns; a promise that resolves when operaiton is done
 * */
export async function loadTranslationXlsxIntoDB(excelFileContent: Buffer) {
    const stream = new Readable();
    stream.push(excelFileContent);
    stream.push(null);
    const rows = await xlsxFile(stream);
    type TranslationInfo = Partial<Record<LanguageOptionCodes, Record<Cell, unknown>>>;
    const translations = rows.reduce<TranslationInfo>((obj, row) => {
        for (let i = 1; i < row.length; i++) {
            const languageObject = obj[LanguageOptions[i - 1].code];
            const row0 = row[0];
            if (!isValidRecordCell(row0)) continue;

            if (languageObject) {
                languageObject[row0] = row[i];
            } else {
                obj[LanguageOptions[i - 1].code] = {
                    [row0]: row[i],
                };
            }
        }
        return obj;
    }, {});

    const title = WorkshopTitle;
    const insertPromises = LanguageOptions.map((language) => {
        const content = translations[language.code];
        const insertNewTranslatedContent = () => {
            return TranslatedContent.insertMany({
                title,
                language: language.code,
                content,
            });
        };

        const removeExistingTranslatedContent = (_id: Types.ObjectId) => {
            return TranslatedContent.findByIdAndDelete({ _id });
        };

        return TranslatedContent.find({
            title,
            language: language.code,
        }).then((result) => {
            if (result.length !== 0) {
                return removeExistingTranslatedContent(
                    result[0]._id
                ).then(() => {
                    return insertNewTranslatedContent();
                });
            } else {
                return insertNewTranslatedContent();
            }
        });
    });
    await Promise.all(insertPromises);
}
