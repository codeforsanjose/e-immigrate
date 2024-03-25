import xlsxFile, { Row } from 'read-excel-file/node';
import fetch from 'node-fetch';
import { LanguageOptionCodes, LanguageOptions, WorkshopTitle } from './LanguageOptions.js';
import { ArrayElementOf } from './types/ArrayElementOf.js';
import { getFullDataPath } from './features/data/locator.js';

const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
};

const sendRequest = (requestObj: { method: string, body: string }, headers = DEFAULT_HEADERS) => {
    const url = 'http://localhost:5000/api/translatedContent/add';
    const response = fetch(url, { ...requestObj, headers })
        .then((data) => data.json())
        .catch((error) => {
            console.log('uploading failed due to error', error);
        });
    return Promise.resolve(response);
};
type Cell = (ArrayElementOf<Row>) & (string | number);

function isValidRecordCell(value: unknown): value is (string | number) {
    return typeof value === 'string' || typeof value === 'number';
}
async function generateLanguageContent() {
    const rows = await xlsxFile(getFullDataPath('./Website Content.xlsx'))
    type LanguageMap = Partial<Record<LanguageOptionCodes, Record<Cell, unknown>>>;
    const data = rows.reduce<LanguageMap>((obj, row) => {
        for (let i = 1; i < row.length; i++) {
            let languageObject = obj[LanguageOptions[i - 1].code];
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

    LanguageOptions.forEach((language) => {
        const requestObj = {
            method: 'POST',
            body: JSON.stringify({
                title: WorkshopTitle,
                language: language.code,
                content: data[language.code],
            }),
        };

        sendRequest(requestObj);
    });
}

generateLanguageContent();
