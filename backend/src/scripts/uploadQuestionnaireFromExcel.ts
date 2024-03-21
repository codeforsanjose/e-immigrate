import xlsxFile from 'read-excel-file/node';
import { LanguageOptions, WorkshopTitle } from '../LanguageOptions.js';
import { getFullDataPath } from '../features/data/locator.js';
import { sendRequest } from './helpers/sendRequest.js';
import { forEachAsync } from '../features/iterators/forEachAsync.js';

async function generateQuestionnaires() {
    await forEachAsync(LanguageOptions, async (language, idx) => {
        const rows = await xlsxFile(getFullDataPath('./Questionnaire for Upload.xlsx'), {
            sheet: idx + 1,
        });
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
                required: row[7] === 'Yes',
                followUpQuestionSlug: row[8] ? row[8] : null,
                parentQuestionSlug: row[9] ? row[9] : null,
            });
        });

        data.shift();

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
