import express from 'express';
import { Questionnaires } from '../../models/questionnaires.js';
import { Types } from 'mongoose';
import { z } from 'zod';
import { DEFAULT_LANGUAGE } from '../../features/languages/default.js';
const router = express.Router();
export { router as questionnairesRouter };
router.route('/').get(async (req, res) => {
    

    const allQuestionnaires = await Questionnaires.find();
    const responsesInfo = { responses: allQuestionnaires };
    res.json(responsesInfo);
    
});

router.route('/:title.:language?').get(async (req, res) => {
    const ROUTE_NAME = 'getQuestionsByLanguage';
    const {
        title: paramTitle,
        language: paramLanguage = DEFAULT_LANGUAGE,
    } = req.params;

    const cleanTitle = decodeURIComponent(paramTitle);
    const cleanLanguage = decodeURIComponent(paramLanguage);
    console.log(`[${ROUTE_NAME}] params`, {
        title: cleanTitle,
        language: cleanLanguage,
    });
    const questionnaires = await Questionnaires.findOne({
        title: cleanTitle,
        language: cleanLanguage,
    });
    console.log(`[${ROUTE_NAME}] results`, {
        questionnaires,
    });
    res.json(questionnaires);
});

const AddSchema = z.object({
    title: z.string(),
    language: z.string(),
    questions: z.array(z.unknown()),
})
router.route('/add').post(async (req, res) => {
    const ROUTE_NAME = 'addQuestionnaires';
    // validate the body
    const reqBody = AddSchema.parse(req.body);
    const {
        title,
        language,
        questions,
    } = reqBody;
    console.log(`[${ROUTE_NAME}] body`, {
        title,
        language,
    });
    res.json('questionnaire added');

    async function insertNewQuestionnaire() {
        await Questionnaires.insertMany({ title, language, questions });
        console.log('questionnaire inserted');
    }

    async function removeExistingQuestionnaires(_id: Types.ObjectId) {
        await Questionnaires.findByIdAndDelete({ _id });
        console.log('questionnaire deleted');
    }

    try {
        const result = await Questionnaires.find({ title, language });
        if (result.length !== 0) {
            await removeExistingQuestionnaires(result[0]._id);
        }
        await insertNewQuestionnaire();
    }
    catch (err) {
        res.send(err);
        return;
    }
});

router.route('/:id').delete(async (req, res) => {
    await Questionnaires.findByIdAndDelete(req.params.id);
    res.json('questionnaire deleted')
});
