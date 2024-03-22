import xlsxFile from 'read-excel-file/node';
import { LanguageOptionCodes, LanguageOptions, WorkshopTitle } from '../LanguageOptions.js';
import { getFullDataPath } from '../features/data/locator.js';
import { sendRequest } from './helpers/sendRequest.js';
import { forEachAsync } from '../features/iterators/forEachAsync.js';
import { isValidRecordCell } from './helpers/isValidRecordCell.js';


async function generateLanguageContent() {
    const rows = await xlsxFile(getFullDataPath('./Website Content.xlsx'));
    type LanguageMap = Partial<Record<LanguageOptionCodes, Record<string | number, unknown>>>;
    const data = rows.reduce<LanguageMap>((obj, row) => {
        for (let i = 1; i < row.length; i++) {
            const languageObject = obj[LanguageOptions[i - 1].code];
            const firstCell = row[0];
            if (!isValidRecordCell(firstCell)) continue;
            if (languageObject != null) {
                languageObject[firstCell] = row[i];
            }
            else {
                obj[LanguageOptions[i - 1].code] = {
                    [firstCell]: row[i],
                };
            }
        }
        return obj;
    }, {});
    await forEachAsync(LanguageOptions, async language => {
        await sendRequest({
            url: 'http://localhost:5000/api/translatedContent/add',
            method: 'POST',
            body: JSON.stringify({
                title: WorkshopTitle,
                language: language.code,
                content: data[language.code],
            }),
        });
    });
}

await generateLanguageContent();
