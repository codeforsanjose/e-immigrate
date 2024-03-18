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
    const {
        title: paramTitle,
        language: paramLanguage = DEFAULT_LANGUAGE,
    } = req.params;
    console.log(paramTitle, decodeURIComponent(paramLanguage));
    const questionnaires = await Questionnaires.findOne({
        title: decodeURIComponent(paramTitle),
        language: paramLanguage,
    });
    console.log('oh here', questionnaires);
    res.json(questionnaires);
});

const AddSchema = z.object({
    title: z.string(),
    language: z.string(),
    questions: z.array(z.unknown()),
})
router.route('/add').post(async (req, res) => {
    // to-do:
    // validateQuestionnaire(req.body);
    const reqBody = AddSchema.parse(req.body);

    const title = reqBody.title;
    const language = reqBody.language;
    const questions = reqBody.questions;
    console.log('THE TITLE OF ADD QUESTIONNAIRE', title, language);
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
