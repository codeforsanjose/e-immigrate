const express = require('express');
const router = express.Router();
const QuestionnaireResponse = require('../../models/questionnaireResponse');
const { ObjectId } = require('mongoose').Types;
const xl = require('excel4node');
const fs = require('fs');
const moment = require('moment-timezone');
const langOptions = require('../../LanguageOptions');
router.route('/responses').post((req, res) => {
    QuestionnaireResponse.find().then((allResponses) => {
        const responses = allResponses.map((item) => {
            const {
                _id,
                title,
                language,
                flag,
                flagOverride = false,
                createdAt,
                updatedAt,
                questionnaireResponse,
                agency = '',
                responseDownloadedToExcel,
            } = item;
            return {
                _id,
                title,
                language,
                flag,
                flagOverride,
                createdAt,
                updatedAt,
                questionnaireResponse,
                agency,
                responseDownloadedToExcel,
            };
        });
        const questions = req.body.questions;
        const downloadAll = req.body.downloadAll;
        const updatedResponses = downloadAll
            ? allResponses
            : allResponses.filter((item) => !item.responseDownloadedToExcel);
        const questionsColumns = questions.reduce((acc, question, idx) => {
            acc[question.slug] = idx + 6;
            return acc;
        }, {});
        var wb = new xl.Workbook();
        var ws = wb.addWorksheet('Questionnaire Responses');
        var style = wb.createStyle({
            font: {
                color: '#000000',
                size: 12,
            },
            numberFormat: '$#,##0.00; ($#,##0.00); -',
        });

        ws.cell(1, 1).string('Workshop Title');
        ws.cell(1, 2).string('Created At');
        ws.cell(1, 3).string('Red Dot?');
        ws.cell(1, 4).string('Agency');
        ws.cell(1, 5).string('Email Sent');
        ws.cell(1, 6).string('Language');

        Object.keys(questionsColumns).map((question) => {
            ws.cell(1, questionsColumns[question])
                .string(question)
                .style(style);
        });

        updatedResponses.map((response, idx) => {
            const createdAtFormatted = moment(response.createdAt).format(
                'MM/DD/YYYYThh:mm:ss'
            );

            const langObject = langOptions.LanguageOptions.find(
                (item) => item.code === response.language
            );
            const langDisplay =
                (langObject && langObject.englishName) || `Unknown `;
            const row = idx + 2;
            ws.cell(row, 1).string(response.title).style(style);
            ws.cell(row, 2).string(createdAtFormatted).style(style);
            ws.cell(row, 3)
                .string(response.flag ? 'true' : 'false')
                .style(style)
                .style({
                    fill: {
                        type: 'pattern',
                        patternType: 'solid',
                        bgColor: response.flag ? '#EA2616' : '#ADFF3D',
                        fgColor: response.flag ? '#EA2616' : '#ADFF3D',
                    },
                });
            ws.cell(row, 4)
                .string(response.agency ? response.agency : '')
                .style(style);
            ws.cell(row, 5)
                .string(response.emailSent ? 'true' : 'false')
                .style(style);
            ws.cell(row, 6).string(langDisplay).style(style);
            const qResponses = Object.keys(response.questionnaireResponse);

            qResponses.map((qResponse) => {
                if (qResponse !== 'languageCode') {
                    ws.cell(row, questionsColumns[qResponse])
                        .string(response.questionnaireResponse[qResponse])
                        .style(style);
                }
            });
        });
        //in build step be sure to write reports directory with path below
        wb.write('./routes/generateResponsesExcel/reports/ResponsesExcel.xlsx');
        updateResponseDownloadStatus(responses);
        res.json({ msg: 'success' });
    });
});
const updateResponseDownloadStatus = (questionnaireResponses = []) => {
    for (const response of questionnaireResponses) {
        const tempUpdatedResponse = {
            ...response,
            responseDownloadedToExcel: true,
        };
        QuestionnaireResponse.updateOne(
            { _id: ObjectId(response._id) },
            tempUpdatedResponse,
            (err, raw) => {
                if (err) {
                    console.log(
                        'updated download status something err is',
                        err
                    );
                }
            }
        );
    }
};
router.route('/getLatest/:filename').get((req, res) => {
    const filename = req.params.filename;
    res.download('routes/generateResponsesExcel/reports/' + filename);
});

// delete the file after downloaded
router.route('/delete/:filename').get((req, res) => {
    const filename = req.params.filename;
    fs.unlink('../../' + filename, function (response, error) {});
    res.status(202).json({ msg: 'deleted file' });
});

module.exports = router;
