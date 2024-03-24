import express from 'express';
import { QuestionnaireResponse } from '../models/questionnaireResponse.js';
import xl from 'excel4node';
import { z } from 'zod';
import mongoose from 'mongoose';

import { LanguageOptions } from '../LanguageOptions.js';
import { ArrayElementOf } from '../types/ArrayElementOf.js';
import { ExcelReports } from '../models/excelReports.js';
import { authMiddleware } from '../middleware/authMiddleware.js'; 
import { userRequestAccessor } from '../features/userAccess/index.js';
import { RequestError } from '../errors/RequestError.js';
import { PassThrough } from 'stream';
import { routeLogger } from '../features/logging/logger.js';

const router = express.Router();
export { router as generateResponsesExcelRouter };
const Schema1 = z.object({
    questions: z.array(z.object({
        slug: z.string(),
    })),
    downloadAll: z.boolean(),
});

router.route('/get-report/:id').get(async (req, res) => {
    const logger = routeLogger('getReportById');
    const paramId = req.params.id;
    logger.info({
        id: paramId,
    });
    // const admin = userRequestAccessor.get(res);
    // if (admin == null) throw new RequestError('Missing the user data', undefined, 401);
    const report = await ExcelReports.findOne({
        _id: paramId,
    });
    if (report == null) {
        throw new RequestError('Missing report', undefined, 404);
    }

    const readStream = new PassThrough();
    readStream.end(report.data);
    res.set('Content-disposition', `attachment; filename=${report.filename}`);
    res.set('Content-Type', 'text/plain');
    readStream.pipe(res);
});
router.use(authMiddleware); // all apis AFTER this line will require authentication as implemented in auth.js

function isKeyOf<TValue extends Record<string, unknown>>(key: string, value: TValue): key is (keyof TValue & string) {
    return key in value;
}

const standardHeaders = [
    'Workshop Title',
    'Red Dot?',
    'Agency',
    'Email Sent',
    'Language',
];
const standardHeaderOffset = standardHeaders.length + 1;
router.route('/responses').post(async function generateResponsesExcel(req, res) {
    const logger = routeLogger('generateResponsesExcel');
    logger.debug('begin');
    const bodyData = Schema1.parse(req.body);
    const admin = userRequestAccessor.get(res);
    if (admin == null) throw new RequestError('Missing the user data', undefined, 401);
    const allDboResponses = await QuestionnaireResponse.find();
    
    type DboItem = ArrayElementOf<typeof allRemappedDboResponses>;
    const allRemappedDboResponses = allDboResponses.map((item) => {
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
   
    async function updateResponseDownloadStatus(questionnaireResponses: Array<DboItem> = []) {
        for (const response of questionnaireResponses) {
            const tempUpdatedResponse = {
                ...response,
                responseDownloadedToExcel: true,
            };
            try {
                await QuestionnaireResponse.updateOne(
                    { _id: response._id },
                    tempUpdatedResponse
                );
            }   
            catch (err) {
                logger.error(err, 'updated download status something err is');
            }
        }
    }
    const questions = bodyData.questions;
    const downloadAll = bodyData.downloadAll;
    
    const updatedDboResponses = allDboResponses.filter(item => {
        return (item.responseDownloadedToExcel ?? false) !== downloadAll;
    });
    const questionsColumns = questions.reduce<Record<string, number>>((acc, question, idx) => {
        acc[question.slug] = idx + standardHeaderOffset;
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

    
    // generate the header row
    standardHeaders.forEach((value, index) => {
        ws.cell(1, 1 + index).string(value);
    });
    
    Object.keys(questionsColumns).forEach((question) => {
        ws.cell(1, questionsColumns[question])
            .string(question)
            .style(style);
    });

    updatedDboResponses.forEach((dboResponse, idx) => {
        const {
            language,
        } = dboResponse;
        const langObject = LanguageOptions.find(item => item.code === language);
        const langDisplay = langObject?.englishName ?? `Unknown `;
        const row = idx + 2;
        ws.cell(row, 1).string(dboResponse.title).style(style);
        ws.cell(row, 2)
            .string((dboResponse.flag ?? false) ? 'true' : 'false')
            .style(style)
            .style({
                fill: {
                    type: 'pattern',
                    patternType: 'solid',
                    bgColor: (dboResponse.flag ?? false) ? '#EA2616' : '#ADFF3D',
                    fgColor: (dboResponse.flag ?? false) ? '#EA2616' : '#ADFF3D',
                },
            });
        ws.cell(row, 3)
            .string(dboResponse.agency ?? '')
            .style(style);
        ws.cell(row, 4)
            .string((dboResponse.emailSent ?? false) ? 'true' : 'false')
            .style(style);
        ws.cell(row, 5).string(langDisplay).style(style);
        const qResponses = Object.keys(dboResponse.questionnaireResponse);
        qResponses.forEach((qResponse) => {
            if (qResponse === 'languageCode') return;
            if (isKeyOf(qResponse, dboResponse.questionnaireResponse)) {
                const value = dboResponse.questionnaireResponse[qResponse] ?? '';
                ws.cell(row, questionsColumns[qResponse])
                    .string(`${value}`)
                    .style(style);
            }
            else {
                ws.cell(row, questionsColumns[qResponse])
                    .string('')
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
    await updateResponseDownloadStatus(allRemappedDboResponses);
    res.json({ 
        id: saveResult._id,
    });
});

// router.route('/getLatest/:filename').get((req, res) => {
//     // TODO_SECURITY
//     const filename = req.params.filename;
//     res.download('routes/generateResponsesExcel/reports/' + filename);
// });

// // delete the file after downloaded
// router.route('/delete/:filename').get((req, res) => {
//     // TODO_SECURITY
//     const filename = req.params.filename;
//     fs.unlink('../../' + filename, function () {});
//     res.status(202).json({ msg: 'deleted file' });
// });
