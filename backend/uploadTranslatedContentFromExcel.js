const xlsxFile = require('read-excel-file/node');
const fetch = require('node-fetch');
const { LanguageOptions, WorkshopTitle } = require('./LanguageOptions');

const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
};

const sendRequest = (requestObj, headers = DEFAULT_HEADERS) => {
    const url = 'http://localhost:5000/api/translatedContent/add';
    const response = fetch(url, { ...requestObj, headers }).then((data) =>
        data.json()
    );
    return Promise.resolve(response);
};

const generateLanguageContent = () => {
    xlsxFile('./Website Content.xlsx').then((rows) => {
        const data = rows.reduce((obj, row) => {
            for (let i = 1; i < row.length; i++) {
                let languageObject = obj[LanguageOptions[i - 1].code];

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
    });
};

generateLanguageContent();
