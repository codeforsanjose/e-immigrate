import express from 'express';
import { QuestionnaireResponse } from '../../models/questionnaireResponse.js';
import xl from 'excel4node';
import fs from 'fs';
import { ObjectId } from "mongodb";
import {LanguageOptions} from '../../LanguageOptions.js';
import { z } from 'zod';
import { ArrayElementOf } from '../../types/ArrayElementOf.js';
import { Model, QueryWithHelpers, Schema } from 'mongoose';
const router = express.Router();
export { router as generateResponsesExcelRouter };
const Schema1 = z.object({
    questions: z.array(z.object({
        slug: z.string(),
    })),
    downloadAll: z.unknown(),
})



router.route('/responses').post(async (req, res) => {
    const bodyData = Schema1.parse(req.body);
    const allResponses = await QuestionnaireResponse.find();

    type ResponseItem = ArrayElementOf<typeof responses>;
    const responses = allResponses.map((item)=> {
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
    type RequestBody = {
        questions: unknown;
        downloadAll: unknown;
    }
    function updateResponseDownloadStatus(questionnaireResponses: Array<ResponseItem> = []) {
        for (const response of questionnaireResponses) {
            const tempUpdatedResponse = {
                ...response,
                responseDownloadedToExcel: true,
            };
            QuestionnaireResponse.updateOne(
                { _id: response._id },
                tempUpdatedResponse,
                (err: unknown, raw: unknown) => {
                    if (err) {
                        console.log(
                            'updated download status something err is',
                            err
                        );
                    }
                }
            );
        }
    }
    const questions = bodyData.questions;
    const downloadAll = bodyData.downloadAll;
    const updatedResponses = downloadAll
        ? allResponses
        : allResponses.filter((item) => !item.responseDownloadedToExcel);
    const questionsColumns = questions.reduce<Record<string, number>>((acc, question, idx) => {
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
    ws.cell(1, 2).string('Red Dot?');
    ws.cell(1, 3).string('Agency');
    ws.cell(1, 4).string('Email Sent');
    ws.cell(1, 5).string('Language');

    Object.keys(questionsColumns).map((question) => {
        ws.cell(1, questionsColumns[question])
            .string(question)
            .style(style);
    });

    updatedResponses.map((response, idx) => {
        const langObject = LanguageOptions.find(
            (item) => item.code === response.language
        );
        const langDisplay =
            (langObject && langObject.englishName) || `Unknown `;
        const row = idx + 2;
        ws.cell(row, 1).string(response.title).style(style);
        ws.cell(row, 2)
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
        ws.cell(row, 3)
            .string(response.agency ? response.agency : '')
            .style(style);
        ws.cell(row, 4)
            .string(response.emailSent ? 'true' : 'false')
            .style(style);
        ws.cell(row, 5).string(langDisplay).style(style);
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

router.route('/getLatest/:filename').get((req, res) => {
    const filename = req.params.filename;
    res.download('routes/generateResponsesExcel/reports/' + filename);
});

// delete the file after downloaded
router.route('/delete/:filename').get((req, res) => {
    const filename = req.params.filename;
    fs.unlink('../../' + filename, function () {});
    res.status(202).json({ msg: 'deleted file' });
});

