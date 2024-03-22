import xlsxFile from 'read-excel-file/node';
import { LanguageOptions, WorkshopTitle } from '../LanguageOptions.js';
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
async function generateQuestionnaires() {
    await forEachAsync(LanguageOptions, async (language, idx) => {
        const rows = await xlsxFile(getFullDataPath('./Questionnaire for Upload.xlsx'), {
            sheet: idx + 1,
        });
      
        const data: Array<z.infer<typeof RowSchema>> = [];
        rows.forEach((row) => {
            const parseResult = RowSchema.safeParse({
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
