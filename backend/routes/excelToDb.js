/**
 * this module exports interfaces for taking in excel spreadesheets and loading into objects in the database
 * */
const Questionnaires = require('../models/questionnaires');
const TranslatedContent = require('../models/translatedContent');
const xlsxFile = require('read-excel-file/node');
const Readable = require('stream').Readable;
const { LanguageOptions, WorkshopTitle } = require('../LanguageOptions');

/**
 * load questionnaire excel file into objects in the Questionnaires collection
 * excelFileContent - Node Buffer containing the excel file, this assumes must be formmated
 *                    with proper sheets for each langauge
 * returns; a promise that resolves when operaiton is done
 * */
function loadQuestionnaireXlsxIntoDB(excelFileContent, title = WorkshopTitle) {
    const questionnairePromises = LanguageOptions.map((language, idx) => {
        const stream = new Readable();
        stream.push(excelFileContent);
        stream.push(null);
        return xlsxFile(stream, {
            sheet: idx + 1,
        }).then((rows) => {
            const data = [];
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
    return Promise.allSettled(questionnairePromises).then((questionnaires) => {
        const insertPromises = LanguageOptions.map((language, idx) => {
            const questions = questionnaires[idx];
            const insertNewQuestionnaire = () => {
                return Questionnaires.insertMany({
                    title,
                    language: language.code,
                    questions,
                });
            };

            const removeExistingQuestionnaires = (_id) => {
                return Questionnaires.findByIdAndDelete({ _id });
            };

            return Questionnaires.find({ title, language: language.code }).then(
                (result) => {
                    if (result.length !== 0) {
                        return removeExistingQuestionnaires(result[0]._id).then(
                            () => {
                                return insertNewQuestionnaire();
                            }
                        );
                    } else {
                        return insertNewQuestionnaire();
                    }
                }
            );
        });
        return Promise.all(insertPromises);
    });
}

/**
 * load translation excel file into objects in the TranslatedContent collection
 * excelFileContent - Node Buffer containing the excel file, this assumes must be formmated
 *                    with proper translation sheet format
 * returns; a promise that resolves when operaiton is done
 * */
function loadTranslationXlsxIntoDB(excelFileContent) {
    const stream = new Readable();
    stream.push(excelFileContent);
    stream.push(null);
    return xlsxFile(stream)
        .then((rows) => {
            const data = rows.reduce((obj, row) => {
                for (let i = 1; i < row.length; i++) {
                    const languageObject = obj[LanguageOptions[i - 1].code];

                    if (languageObject) {
                        languageObject[row[0]] = row[i];
                    } else {
                        obj[LanguageOptions[i - 1].code] = {
                            [row[0]]: row[i],
                        };
                    }
                }
                return obj;
            }, {});
            return data;
        })
        .then((translations) => {
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

                const removeExistingTranslatedContent = (_id) => {
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
            return Promise.all(insertPromises);
        });
}
module.exports = { loadQuestionnaireXlsxIntoDB, loadTranslationXlsxIntoDB };
