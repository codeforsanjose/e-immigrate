import express from 'express';
import { QuestionnaireResponse } from '../models/questionnaireResponse.js';
import xl from 'excel4node';
import fs from 'fs';
import { ObjectId } from "mongodb";
import { z } from 'zod';
import mongoose, { Model, QueryWithHelpers, Schema } from 'mongoose';

import { LanguageOptions } from '../LanguageOptions.js';
import { ArrayElementOf } from '../types/ArrayElementOf.js';
import { ExcelReports } from '../models/excelReports.js';
import { authMiddleware } from '../middleware/authMiddleware.js'; 
import { userRequestAccessor } from '../features/userAccess/index.js';
import { RequestError } from '../errors/RequestError.js';
import { PassThrough } from 'stream';

const router = express.Router();
export { router as generateResponsesExcelRouter };
const Schema1 = z.object({
    questions: z.array(z.object({
        slug: z.string(),
    })),
    downloadAll: z.unknown(),
});

router.route('/get-report/:id').get(async (req, res) => {
    // const admin = userRequestAccessor.get(res);
    // if (admin == null) throw new RequestError('Missing the user data', undefined, 401);
    const report = await ExcelReports.findOne({
        _id: req.params.id,
    });
    if (report == null) {
        throw new RequestError('Missing report', undefined, 404);
    }

    const readStream = new PassThrough();
    readStream.end(report.data);
    res.set('Content-disposition', 'attachment; filename=' + report.filename);
    res.set('Content-Type', 'text/plain');
    readStream.pipe(res);
});
router.use(authMiddleware); // all apis AFTER this line will require authentication as implemented in auth.js
router.route('/responses').post(async (req, res) => {
    const bodyData = Schema1.parse(req.body);
    const admin = userRequestAccessor.get(res);
    if (admin == null) throw new RequestError('Missing the user data', undefined, 401);
    const allResponses = await QuestionnaireResponse.find();

    type ResponseItem = ArrayElementOf<typeof responses>;
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
    type RequestBody = {
        questions: unknown;
        downloadAll: unknown;
    };
    async function updateResponseDownloadStatus(questionnaireResponses: Array<ResponseItem> = []) {
        for (const response of questionnaireResponses) {
            const tempUpdatedResponse = {
                ...response,
                responseDownloadedToExcel: true,
            };
            try {
                const raw = await QuestionnaireResponse.updateOne(
                    { _id: response._id },
                    tempUpdatedResponse
                );
            }   
            catch (err) {
                console.log(
                    'updated download status something err is',
                    err
                );
            }
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
    const wb = new xl.Workbook();
    const ws = wb.addWorksheet('Questionnaire Responses');
    const style = wb.createStyle({
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

    Object.keys(questionsColumns).forEach((question) => {
        ws.cell(1, questionsColumns[question])
            .string(question)
            .style(style);
    });

    updatedResponses.forEach((response, idx) => {
        const langObject = LanguageOptions.find(
            (item) => item.code === response.language
        );
        const langDisplay = langObject?.englishName ?? `Unknown `;
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

        qResponses.forEach((qResponse) => {
            if (qResponse !== 'languageCode') {
                ws.cell(row, questionsColumns[qResponse])
                    .string(response.questionnaireResponse[qResponse])
                    .style(style);
            }
        });
    });
    // NOTE: we should replace this with a "write to some table" call

    const buffer = await wb.writeToBuffer();
    const now = new Date();
    const report = new ExcelReports({
        _id: new mongoose.Types.ObjectId(),
        data: buffer,
        filename: `ResponsesExcel.xlsx`,
        dateGenerated: now,
        user: admin._id,
    });
    const saveResult = await report.save();
    // //in build step be sure to write reports directory with path below
    // wb.write('./routes/generateResponsesExcel/reports/ResponsesExcel.xlsx');
    // // write to response stream
    // wb.write('ResponsesExcel.xlsx', res);
    await updateResponseDownloadStatus(responses);
    res.json({ 
        id: saveResult._id,
    });
});

router.route('/getLatest/:filename').get((req, res) => {
    // TODO_SECURITY
    const filename = req.params.filename;
    res.download('routes/generateResponsesExcel/reports/' + filename);
});

// delete the file after downloaded
router.route('/delete/:filename').get((req, res) => {
    // TODO_SECURITY
    const filename = req.params.filename;
    fs.unlink('../../' + filename, function () {});
    res.status(202).json({ msg: 'deleted file' });
});
