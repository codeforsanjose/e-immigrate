import express from 'express';
import { TranslatedContent } from '../../models/translatedContent.js';
import { Types } from 'mongoose';
import { z } from 'zod';
import { RequestError } from '../../errors/RequestError.js';
import { DEFAULT_LANGUAGE } from '../../features/languages/default.js';
const router = express.Router();
export { router as translatedContentRouter };

router.route('/').get((req, res) => {
    TranslatedContent
        .find()
        .then((allTranslatedContent) => {
            const responsesInfo = { responses: allTranslatedContent };
            res.json(responsesInfo);
        })
});



router.route('/:title.:language?').get(async (req, res) => {
    const {
        title: paramTitle,
        language: paramLanguage = DEFAULT_LANGUAGE,
    } = req.params;
    console.log('/:title.:language?', {
        paramTitle,
        paramLanguage,
    })
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
})
router.route('/add').post(async (req, res) => {
    // to-do:
    // validate(req.body);
    const reqBody = AddSchema.parse(req.body);
    const {
        title,
        language,
        content,
    } = reqBody;
    
    res.json('translated content added');
    async function insertNewTranslatedContent() {
        try {
            await TranslatedContent.insertMany({ title, language, content });
            console.log('translated content inserted');
        }
        catch (err) {
            console.error(err);
        }
    };

    async function removeExistingTranslatedContent(_id: Types.ObjectId) {
        try {
            await TranslatedContent.findByIdAndDelete({ _id });
            console.log('translated content deleted');
        }
        catch (err) {
            console.error(err);
        }
    }

    try {
        const result = await TranslatedContent.find({ title, language });
        if (result.length !== 0) {
            await removeExistingTranslatedContent(result[0]._id);
            await insertNewTranslatedContent();
        } else {
            await insertNewTranslatedContent();
        }
    }
    catch (err) {
        res.send(err);
        return;
    }
});

router.route('/:id').delete((req, res) => {
    const {
        id: paramId,
    } = req.params;
    console.log('/:id', { paramId });
    TranslatedContent.findByIdAndDelete(paramId)
        .then(() => res.json('translated content deleted'))
        .catch((err) => console.log(err));
});

const validateTranslatedContent = (translatedContentObject: unknown) => {
    return translatedContentObject;
};

