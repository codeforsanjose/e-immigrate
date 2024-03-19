import xlsxFile from 'read-excel-file/node';
import fetch from 'node-fetch';
import { LanguageOptions, WorkshopTitle } from './LanguageOptions.js';
import { getFullDataPath } from './features/data/locator.js';
// import { workshopTitle } from '../src/data/LanguageOptions.js';

const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
};

function sendRequest(requestObj: { method: string, body: string }, headers = DEFAULT_HEADERS) {
    const url = 'http://localhost:5000/api/questionnaires/add';
    const response = fetch(url, { ...requestObj, headers })
        .then((data) => data.json())
        .catch((error) => {
            console.log('uploading failed due to error', error);
        });
    return Promise.resolve(response);
}

function generateQuestionnaires() {
    LanguageOptions.map((language, idx) => {
        xlsxFile(getFullDataPath('./Questionnaire for Upload.xlsx'), {
            sheet: idx + 1,
        }).then((rows) => {
            const data: Array<{
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
            }> = [];
            rows.forEach((row) => {
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

            data.shift();

            const requestObj = {
                method: 'POST',
                body: JSON.stringify({
                    title: WorkshopTitle,
                    language: language.code,
                    questions: data,
                }),
            };

            sendRequest(requestObj);
        });
    });
}

generateQuestionnaires();
