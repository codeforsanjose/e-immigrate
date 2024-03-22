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
const AddSchema = z.object({
    title: z.string(),
    language: z.string(),
    content: z.unknown(),
});
router.route('/add').post(async (req, res) => {
    const logger = routeLogger('addTranslatedContent');
    const reqBody = AddSchema.parse(req.body);
    const {
        title,
        language,
        content,
    } = reqBody;
    
    res.json('translated content added');

    try {
        const result = await TranslatedContent.find({ title, language });
        if (result.length !== 0) {
            await TranslatedContent.findByIdAndDelete({ 
                _id: result[0]._id,
            });
            logger.debug('translated content deleted');
        }
        await TranslatedContent.insertMany({ title, language, content });
        logger.debug('translated content inserted');
    }
    catch (err) {
        res.send(err);
        return;
    }
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
