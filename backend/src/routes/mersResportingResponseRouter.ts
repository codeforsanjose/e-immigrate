import express from 'express';
import { z } from 'zod';

import { MersReportingQuestionnaireResponse } from '../models/mersReportingQuestionnaireResponses.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { routeLogger } from '../features/logging/logger.js';
const router = express.Router();
export { router as mersReportingQuestionnaireResponsesRouter };


const AddMersSchema = z.object({
    title: z.string(),
    language: z.string(),
    mersReportingQuestionnaireResponse: z.record(z.string(), z.string().nullable()),
});

// TODO: revisit access control
router.route('/add').post(async (req, res) => {
    const logger = routeLogger('addMerz ReportingQuestionnaireResponse');

    const reqBody = AddMersSchema.parse(req.body);
    const {
        language,
        mersReportingQuestionnaireResponse,
        title,
    } = reqBody;
    logger.info({
        origBody: req.body,
        mersReportingQuestionnaireResponse,
    }, 'body');
    const newQuestionnaireResponse = new MersReportingQuestionnaireResponse({
        title,
        language,
        mersReportingQuestionnaireResponse,
    });

    await newQuestionnaireResponse.save();
    res.json('MersReportingQuestionnaireResponse response added');
});

router.use(authMiddleware); // all apis AFTER this line will require authentication as implemented in auth.js

function getAllResponses() {
    return MersReportingQuestionnaireResponse.find({
        $or: [{ deleted: { $exists: false } }, { deleted: false }],
    });
}

function getAllResponsesForIds(ids: Array<string>) {
    return MersReportingQuestionnaireResponse.find({
        $and: [
            {
                $or: [{ deleted: { $exists: false } }, { deleted: false }],
            },
            {
                _id: { $in: ids },
            },
        ],
    });
}

router.route('/').get(async (req, res) => {
    const logger = routeLogger('getAllMERZQuestionnaireResponse');
    logger.trace('CALLED');
    const qResponses = await getAllResponses();
    const responsesInfo = { responses: qResponses };
    res.json(responsesInfo);
});

const AssignAgencySchema = z.array(z.object({
    id: z.string(),
    agency: z.string().nullish(),
}));

router.route('/assign-agency').post(async (req, res) => {
    const logger = routeLogger('agencyAssignURL');
    const requestBody = AssignAgencySchema.parse(req.body);
    for (const change of requestBody) {
        try {
            await MersReportingQuestionnaireResponse.updateOne({ _id: change.id }, {
                agency: change.agency ?? null,
            });
        }
        catch (err) {
            logger.error({
                request: change,
                error: err,
            }, 'Failed to update an agency');
        }
    }
    logger.info(requestBody, 'Successfully assigned agency');
    res.json(await getAllResponsesForIds(requestBody.map(x => x.id)));
});

const AssignFlagSchema = z.array(z.object({
    id: z.string(),
    flag: z.boolean().nullish(),
}));

router.route('/assign-flag').post(async (req, res) => {
    const logger = routeLogger('assignResponseFlag');
    const requestBody = AssignFlagSchema.parse(req.body);
    for (const change of requestBody) {
        try {
            await MersReportingQuestionnaireResponse.updateOne({ _id: change.id }, {
                flag: change.flag ?? null,
            });
        }
        catch (err) {
            logger.error({
                request: change,
                error: err,
            }, 'Failed to update a flag');
        }
    }
    logger.info(requestBody, 'Successfully assigned flag');
    res.json(await getAllResponsesForIds(requestBody.map(x => x.id)));
});


router.route('/:id').get(async (req, res) => {
    const questionnaireResponse = await MersReportingQuestionnaireResponse.findById(req.params.id);
    res.json(questionnaireResponse);
});

router.route('/:id').delete(async (req, res) => {
    const logger = routeLogger('hardDeleteQuestionnaireResponse');
    await MersReportingQuestionnaireResponse.findByIdAndDelete(req.params.id);
    logger.info({
        id: req.params.id,
    }, 'questionnaire response Deleted');
    res.json('questionnaire response Deleted');
});

// SOFT DELETE
router.route('/delete/:id').put(async (req, res) => {
    const logger = routeLogger('softDeleteQuestionnaireResponse');
    const questionnaireResponse = await MersReportingQuestionnaireResponse.findByIdAndUpdate(

        req.params.id,
        { deleted: true });
    if (questionnaireResponse == null) {
        logger.error({
            id: req.params.id,
        }, 'Failed to find');
        return;
    }
    logger.info({
        paramId: req.params.id,
        dbId: questionnaireResponse._id.toString(),
    }, `questionnaire response soft-deleted`);
    res.status(202).json({
        msg: 'questionnaire response deleted softly',
    });
});

router.route('');
