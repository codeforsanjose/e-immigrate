const xlsxFile = require('read-excel-file/node');
const fs = require('fs');
const fetch = require('node-fetch');
const LanguageOptions = require('./LanguageOptions');

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

/*
get rows from excel sheet
translate into object in this format:
const data = {
    en: {
        homeButton: "home"
    },
    es: {
        homeButton: "casa"
    }
}
save objects to mongo
frontend requests langObject based on language dropdown selection

Object.keys(data).forEach(key => upload data[key] object to mongo)
*/

const generateLanguageContent = () => {
    xlsxFile('../src/data/content/Website Content.xlsx').then((rows) => {
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
                    title: language.code,
                    content: data[language.code],
                }),
            };

            sendRequest(requestObj);
        });
    });
};

generateLanguageContent();
