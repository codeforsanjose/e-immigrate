const xlsxFile = require('read-excel-file/node');
const fs = require('fs');
const fetch = require('node-fetch');

const DEFAULT_HEADERS = {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
};

const sendRequest = (requestObj, headers = DEFAULT_HEADERS) => {
    const url = 'http://localhost:5000/api/questionnaires/add';
    const response = fetch(url, { ...requestObj, ...headers }).then((data) =>
        data.json()
    );
    return Promise.resolve(response);
};

const generateQuestionnaires = () => {
    xlsxFile('../src/data/questions/Questionnaire for Upload.xlsx').then(
        (rows) => {
            const data = [];
            rows.forEach((row) => {
                data.push({
                    number: row[0],
                    category: row[1],
                    text: row[2],
                    questionType: row[3],
                    answerType: row[4],
                    required: row[5] === 'Yes' ? true : false,
                    followUp: row[6],
                });
            });

            data.shift();

            const requestObj = {
                method: 'POST',
                body: JSON.stringify({
                    title: 'CIIT Initial Workshop',
                    questions: data,
                }),
            };

            sendRequest(requestObj);
        }
    );
};

generateQuestionnaires();

const generateLanguageContent = () => {
    xlsxFile('../src/data/content/Language Content.xlsx').then((rows) => {
        const data = {};
        rows.forEach((row) => {
            data[row[0]] = {
                en: row[1],
                es: row[2],
                vi: row[3],
            };
        });

        fs.writeFile(
            '../src/data/content/Content.js',
            `export const content = ${JSON.stringify(data)}`,
            (err) => {
                if (err) return console.log(err);
                console.log('Language content data written to file');
            }
        );
    });
};
