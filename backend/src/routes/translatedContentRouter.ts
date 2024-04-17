import express from 'express';
import { z } from 'zod';

import { TranslatedContent } from '../models/translatedContent.js';
import { DEFAULT_LANGUAGE } from '../features/languages/default.js';
import { routeLogger } from '../features/logging/logger.js';
const router = express.Router();
export { router as translatedContentRouter };

router.route('/').get(async (req, res) => {
    const allTranslatedContent = await TranslatedContent.find();
    const responsesInfo = { responses: allTranslatedContent };
    res.json(responsesInfo);
});

router.route('/:title.:language?').get(async (req, res) => {
    const logger = routeLogger('getTranslatedContentByLanguage');
    const {
        title: paramTitle,
        language: paramLanguage = DEFAULT_LANGUAGE,
    } = req.params;
    logger.info({
        title: paramTitle,
        language: paramLanguage,
    }, '/:title.:language?');
    const translateContent = await TranslatedContent.findOne({
        title: req.params.title,
        language: req.params.language,
    });
    res.json(translateContent);
});
const ContentTextSchema = z.object({
    languageCode: z.string(),
    buttonHome: z.string(),
    buttonAbout: z.string(),
    footerText1: z.string(),
    footerText2: z.string(),
    homeWelcomeMessage: z.string(),
    homeHeader1: z.string(),
    homeText1: z.string(),
    homeHeader2: z.string(),
    homeText2: z.string(),
    homeText3: z.string(),
    homeProceedButton: z.string(),
    screeningHeader: z.string(),
    screeningHeader2: z.string(),
    errorMessage: z.string(),
    screeningDate: z.string(),
    screeningDateMarried: z.string(),
    modalText1: z.string(),
    modalText2: z.string(),
    modalText3: z.string(),
    modalText4: z.string(),
    modalExitButton: z.string(),
    screeningProceedButton: z.string(),
    stepsHeader: z.string(),
    stepsHeader2: z.string(),
    stepsHeader3: z.string(),
    stepsProceedButton: z.string(),
    step1Header: z.string(),
    step1Title: z.string(),
    step1Instructions: z.string(),
    step1VideoID: z.string(),
    step1Tip1: z.string(),
    step1Tip2: z.string(),
    step1Ending: z.string(),
    step1ProceedButton: z.string(),
    step2Header: z.string(),
    step2Title: z.string(),
    step2Instructions: z.string(),
    step2Tip1: z.string(),
    step2Tip2: z.string(),
    step2Header2: z.string(),
    step2Tip4: z.string(),
    step2Tip5: z.string(),
    step2Tip6: z.string(),
    step2ProceedButton1: z.string(),
    step2ProceedButton2: z.string(),
    step2ProceedButton3: z.string(),
    step2Ending: z.string(),
    step2ProceedButton4: z.string(),
    step3Header: z.string(),
    step3Title: z.string(),
    step3Instructions: z.string(),
    step3Header2: z.string(),
    step3Text2: z.string(),
    step3Header3: z.string(),
    step3Text3: z.string(),
    step3Tip1: z.string(),
    step3Tip2: z.string(),
    step3Tip3: z.string(),
    step3Text4: z.string(),
    step3Text5: z.string(),
    step3Text6: z.string(),
    progressBarHeader: z.string(),
    errorMessageEmail: z.string(),
    errorMessagePhone: z.string(),
    errorMessageZip: z.string(),
    required: z.string(),
    optional: z.string(),
    closedMessage: z.string(),
    closingDate: z.string(),
});
const AddSchema = z.object({
    title: z.string(),
    language: z.string(),
    content: ContentTextSchema,
});
router.route('/add').post(async (req, res) => {
    const logger = routeLogger('addTranslatedContent');
    const reqBody = AddSchema.parse(req.body);
    const {
        title,
        language,
        content,
    } = reqBody;

    const result = await TranslatedContent.find({ title, language });
    if (result.length !== 0) {
        const id = result[0]._id;
        await TranslatedContent.findByIdAndDelete({ 
            _id: id,
        });
        logger.debug({
            id,
            language,
            title,
        }, 'translated content deleted');
    }
    await TranslatedContent.insertMany({ title, language, content });
    logger.debug({
        language,
        title,
    }, 'translated content inserted');

    res.json('translated content added');
});

router.route('/:id').delete(async (req, res) => {
    const logger = routeLogger('getTranslatedContentById');
    const {
        id: paramId,
    } = req.params;
    logger.info({ 
        id: paramId,
    }, '/:id');
    await TranslatedContent.findByIdAndDelete(paramId);
    res.json('translated content deleted');
});
