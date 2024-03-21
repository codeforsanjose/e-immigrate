import express from 'express';
import mongoose, { Types } from 'mongoose';
import { z } from 'zod';

import { Questionnaires, questionnairesSchema } from '../models/questionnaires.js';
import { DEFAULT_LANGUAGE } from '../features/languages/default.js';
import { routeLogger } from '../features/logging/logger.js';
const router = express.Router();
export { router as questionnairesRouter };

type GetEntityModel<TModel> = 
    TModel extends mongoose.Model<infer TRawDocType, infer TQueryHelpers, infer _, infer _, infer THydratedDocumentType> 
        ? NonNullable<Awaited<mongoose.QueryWithHelpers<THydratedDocumentType | null, THydratedDocumentType, TQueryHelpers, TRawDocType, 'findOne'>>>
        : never
;


type DboQuestionnaire = GetEntityModel<typeof Questionnaires>;
function remapQuestionnaire(questionnaire: DboQuestionnaire) {
    const {
        _id,
        title,
        language,
        questions,
    } = questionnaire;
    return {
        _id,
        title,
        language,
        questions,
    };
}


router.route('/').get(async (req, res) => {
    const allQuestionnaires = await Questionnaires.find();
    res.json({
        responses: allQuestionnaires.map(remapQuestionnaire),
    });
});


router.route('/:title.:language?').get(async (req, res) => {
    const logger = routeLogger('getQuestionsByLanguage');
    const {
        title: paramTitle,
        language: paramLanguage = DEFAULT_LANGUAGE,
    } = req.params;

    const cleanTitle = decodeURIComponent(paramTitle);
    const cleanLanguage = decodeURIComponent(paramLanguage);
    logger.debug({
        title: cleanTitle,
        language: cleanLanguage,
    }, 'params');
    const questionnaires = await Questionnaires.findOne({
        title: cleanTitle,
        language: cleanLanguage,
    });

    // 404 if not found.
    if (questionnaires == null) {
        logger.warn({
            title: cleanTitle,
            language: cleanLanguage,
        }, `Failed to find the requested questionnaire`);
        res.sendStatus(404);
        return;
    }
    // type DboQuestionnaire = typeof questionnaires;
    // function remapQuestionnaire(questionnaire: DboQuestionnaire) {
    //     const {
    //         _id,
    //         title,
    //         language,
    //         questions,
    //     } = questionnaire;
    //     return {
    //         _id,
    //         title,
    //         language,
    //         questions: questions.map(question => {
    //             return {
    //                 ...question,
    //             };
    //         }),
    //     };
    // }
    
    const result = remapQuestionnaire(questionnaires);
    res.json(result);
    return;
});

const AddQuestionnaireSchema = z.object({
    title: z.string(),
    language: z.string(),
    questions: z.array(z.unknown()),
});
router.route('/add').post(async (req, res) => {
    const logger = routeLogger('addQuestionnaires');
    // validate the body
    const reqBody = AddQuestionnaireSchema.parse(req.body);
    const {
        title,
        language,
        questions,
    } = reqBody;
    logger.info({
        title,
        language,
    }, 'request body');
    try {
        const result = await Questionnaires.find({ title, language });
        if (result.length !== 0) {
            await Questionnaires.findByIdAndDelete({
                _id: result[0]._id,
            });
            logger.debug('questionnaire deleted');
        }
        await Questionnaires.insertMany({
            title,
            language,
            questions,
        });
        logger.debug('questionnaire inserted');
        res.status(200).send();
        return;
    }
    catch (err) {
        logger.error(err, 'operation failed');
        res.send(err);
        return;
    }
});

router.route('/:id').delete(async (req, res) => {
    await Questionnaires.findByIdAndDelete(req.params.id);
    res.json('questionnaire deleted');
});
