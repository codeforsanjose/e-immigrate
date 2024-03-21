import xlsxFile, { Row } from 'read-excel-file/node';
import { LanguageOptionCodes, LanguageOptions, WorkshopTitle } from '../LanguageOptions.js';
import { ArrayElementOf } from '../types/ArrayElementOf.js';
import { getFullDataPath } from '../features/data/locator.js';
import { sendRequest } from './helpers/sendRequest.js';
import { forEachAsync } from '../features/iterators/forEachAsync.js';

type Cell = (ArrayElementOf<Row>) & (string | number);

function isValidRecordCell(value: unknown): value is (string | number) {
    return typeof value === 'string' || typeof value === 'number';
}
async function generateLanguageContent() {
    const rows = await xlsxFile(getFullDataPath('./Website Content.xlsx'));
    type LanguageMap = Partial<Record<LanguageOptionCodes, Record<Cell, unknown>>>;
    const data = rows.reduce<LanguageMap>((obj, row) => {
        for (let i = 1; i < row.length; i++) {
            const languageObject = obj[LanguageOptions[i - 1].code];
            const row0 = row[0];
            if (!isValidRecordCell(row0)) continue;
            if (languageObject != null) {
                languageObject[row0] = row[i];
            }
            else {
                obj[LanguageOptions[i - 1].code] = {
                    [row0]: row[i],
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
