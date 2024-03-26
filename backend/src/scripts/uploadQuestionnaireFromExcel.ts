import xlsxFile from 'read-excel-file/node';
import { ExcelLanguageSheetMap, LanguageOptions, WorkshopTitle } from '../LanguageOptions.js';
import { getFullDataPath } from '../features/data/locator.js';
import { sendRequest } from './helpers/sendRequest.js';
import { forEachAsync } from '../features/iterators/forEachAsync.js';
import { loadQuestionSheet } from '../features/excelFiles/questionnaireExcel.js';

async function generateQuestionnaires() {
    type LanguageData = Awaited<ReturnType<typeof loadQuestionSheet>>;
    // eslint-disable-next-line no-undef-init, @typescript-eslint/no-unused-vars
    let englishData: LanguageData | undefined = undefined;
    await forEachAsync(LanguageOptions, async (language, idx) => {
        // find the name of the sheet in the excel file
        const excelSheetName = ExcelLanguageSheetMap[language.code];

        const rows = await xlsxFile(getFullDataPath('./Questionnaire.xlsx'), {
            sheet: excelSheetName,
        });
        const data = loadQuestionSheet(rows, language.code);
        if (language.code === 'en') {
            englishData = data;
        }

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
