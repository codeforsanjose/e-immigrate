import express from 'express';
import { z } from 'zod';

import { QuestionEntity, QuestionnaireEntityWithId, Questionnaires } from '../models/questionnaires.js';
import { DEFAULT_LANGUAGE } from '../features/languages/default.js';
import { routeLogger } from '../features/logging/logger.js';
import { importExcelQuestionSheet } from '../features/excelFiles/questionnaireExcel.js';
const router = express.Router();
export { router as questionnairesRouter };


const loggers = {
    getQuestionsByLanguage: routeLogger('getQuestionsByLanguage'),
};

export type RemappedQuestionnaireDto = {
    _id: string;
    title: string | undefined;
    language: string | undefined;
    questions: Array<QuestionEntity>;
};
function remapQuestionnaire(questionnaire: QuestionnaireEntityWithId): RemappedQuestionnaireDto {
    const {
        _id,
        title,
        language,
        questions,
    } = questionnaire;
    return {
        _id: _id.toString(),
        title,
        language,
        questions,
    };
}
export type GetQuestionsResultDto = {
    responses: Array<RemappedQuestionnaireDto>;
};
async function getQuestionsDriver(): Promise<GetQuestionsResultDto> {
    const allQuestionnaires = await Questionnaires.find();
    return {
        responses: allQuestionnaires.map(remapQuestionnaire),
    };
}

router.route('/').get(async function getQuestions(req, res) {
    res.json(await getQuestionsDriver());
});


async function getQuestionsByLanguageDriver(config: {
    title: string;
    language: string;
}): Promise<RemappedQuestionnaireDto | undefined> {
    const {
        language,
        title,
    } = config;
    const cleanTitle = decodeURIComponent(title);
    const cleanLanguage = decodeURIComponent(language);
    const logger = loggers.getQuestionsByLanguage;
    logger.debug({
        title: cleanTitle,
        language: cleanLanguage,
    }, 'params');
    const dbo = await Questionnaires.findOne({
        title: cleanTitle,
        language: cleanLanguage,
    });
    if (dbo == null) {
        logger.warn({
            title: cleanTitle,
            language: cleanLanguage,
        }, `Failed to find the requested questionnaire`);
        return;
    }
    return remapQuestionnaire(dbo);
}
router.route('/:title.:language?').get(async function getQuestionsByLanguage(req, res) {
    const {
        title: paramTitle,
        language: paramLanguage = DEFAULT_LANGUAGE,
    } = req.params;
    const result = await getQuestionsByLanguageDriver({
        title: paramTitle,
        language: paramLanguage,
    });
    
    res.json(result);
    return;
});
const QuestionSchema = z.object({
    id: z.union([z.string(), z.number()]),
    slug: z.string(),
    category: z.string(),
    text: z.string(),
    questionType: z.string(),
    answerSelections: z.string().nullable(),
    answerValues: z.string().nullable(),
    required: z.boolean(),
    followUpQuestionSlug: z.string().nullable(),
    parentQuestionSlug: z.string().nullable(),
});
const AddQuestionnaireSchema = z.object({
    title: z.string(),
    language: z.string(),
    questions: z.array(QuestionSchema),
});
router.route('/add').post(async function addQuestionnaires(req, res) {
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
        await importExcelQuestionSheet({
            language,
            title,
            questions,
        });
        res.status(200).send();
        return;
    }
    catch (err) {
        logger.error(err, 'operation failed');
        res.send(err);
        return;
    }
});

router.route('/:id').delete(async function deleteQuestionnaire(req, res) {
    await Questionnaires.findByIdAndDelete(req.params.id);
    res.json('questionnaire deleted');
});
