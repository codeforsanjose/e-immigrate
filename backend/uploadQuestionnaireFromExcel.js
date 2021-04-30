const xlsxFile = require('read-excel-file/node');
const fetch = require('node-fetch');
const { LanguageOptions, WorkshopTitle } = require('./LanguageOptions');

const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
};

const sendRequest = (requestObj, headers = DEFAULT_HEADERS) => {
    const url = 'http://localhost:5000/api/questionnaires/add';
    const response = fetch(url, { ...requestObj, headers }).then((data) =>
        data.json()
    );
    return Promise.resolve(response);
};

const generateQuestionnaires = () => {
    LanguageOptions.map((language, idx) => {
        xlsxFile('./Questionnaire for Upload.xlsx', {
            sheet: idx + 1,
        }).then((rows) => {
            const data = [];
            rows.forEach((row) => {
                data.push({
                    id: row[0],
                    slug: row[1],
                    category: row[2],
                    text: row[3],
                    questionType: row[4],
                    answerSelections: row[5],
                    answerValues: row[6],
                    required: row[7] === 'Yes' ? true : false,
                    followUpQuestionSlug: row[8] ? row[8] : null,
                    parentQuestionSlug: row[9] ? row[9] : null,
                });
            });

            data.shift();

            const requestObj = {
                method: 'POST',
                body: JSON.stringify({
                    title: WorkshopTitle,
                    language: language.code,
                    questions: data,
                }),
            };

            sendRequest(requestObj);
        });
    });
};

generateQuestionnaires();
