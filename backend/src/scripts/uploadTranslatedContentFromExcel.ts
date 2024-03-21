import xlsxFile, { Row } from 'read-excel-file/node';
import { LanguageOptionCodes, LanguageOptions, WorkshopTitle } from '../LanguageOptions.js';
import { ArrayElementOf } from '../types/ArrayElementOf.js';
import { getFullDataPath } from '../features/data/locator.js';
import { sendRequest } from './helpers/sendRequest.js';
import { forEachAsync } from '../features/iterators/forEachAsync.js';
import { isValidRecordCell } from './helpers/isVa.js';
import { Cell } from 'read-excel-file/types.js';


async function generateLanguageContent() {
    const rows = await xlsxFile(getFullDataPath('./Website Content.xlsx'));
    type LanguageMap = Partial<Record<LanguageOptionCodes, Record<string | number, unknown>>>;
    const data = rows.reduce<LanguageMap>((obj, row) => {
        for (let i = 1; i < row.length; i++) {
            const languageObject = obj[LanguageOptions[i - 1].code];
            const cell0 = row[0];
            if (!isValidRecordCell(cell0)) continue;
            if (languageObject != null) {
                languageObject[cell0] = row[i];
            }
            else {
                obj[LanguageOptions[i - 1].code] = {
                    [cell0]: row[i],
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