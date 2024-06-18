import xlsxFile from 'read-excel-file/node';
// import { ExcelLanguageSheetMap, LanguageOptions, MERSWorkshopTitle } from '../LanguageOptions.js';
import { MERSWorkshopTitle } from '../LanguageOptions.js';
import { getFullDataPath } from '../features/data/locator.js';
import { sendRequest } from './helpers/sendRequest.js';
// import { forEachAsync } from '../features/iterators/forEachAsync.js';
import { loadQuestionSheet } from '../features/excelFiles/questionnaireExcel.js';

async function generateMersQuestionnaires() {
    console.log('the excel sheet title', MERSWorkshopTitle);
    const rows = await xlsxFile(getFullDataPath('./ReportingQuestionnaire.xlsx'), {
        sheet: 'English',
    });
    const data = loadQuestionSheet(rows, 'en');
    await sendRequest({
        url: 'http://localhost:3001/api/questionnaires/add',
        method: 'POST',
        body: JSON.stringify({
            title: MERSWorkshopTitle,
            language: 'en',
            questions: data,
        }),
    });
    // await forEachAsync(LanguageOptions, async (language, idx) => {
    //     // find the name of the sheet in the excel file
    //     const excelSheetName = ExcelLanguageSheetMap[language.code];
    //     console.log('the excel sheet name', MERSWorkshopTitle);
    //     const rows = await xlsxFile(getFullDataPath('./ReportingQuestionnaire.xlsx'), {
    //         sheet: excelSheetName,
    //     });
    //     const data = loadQuestionSheet(rows, language.code);
    //     if (language.code === 'en') {
    //         englishData = data;
    //     }
    //     await sendRequest({
    //         url: 'http://localhost:3001/api/questionnaires/add',
    //         method: 'POST',
    //         body: JSON.stringify({
    //             title: MERSWorkshopTitle,
    //             language: language.code,
    //             questions: data,
    //         }),
    //     });
    // });
}

await generateMersQuestionnaires();
