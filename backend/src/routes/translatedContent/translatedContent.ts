import express from 'express';
import { TranslatedContent } from '../../models/translatedContent.js';
import { Types } from 'mongoose';
import { z } from 'zod';
const router = express.Router();
export { router as translatedContentRouter };

router.route('/').get((req, res) => {
    TranslatedContent
        .find()
        .then((allTranslatedContent) => {
            const responsesInfo = { responses: allTranslatedContent };
            res.json(responsesInfo);
        })
        .catch((err) => console.log(err));
});

router.route('/:title.:language').get((req, res) => {
    TranslatedContent.findOne({
        title: req.params.title,
        language: req.params.language,
    })
        .then((translatedContent) => res.json(translatedContent))
        .catch((err) => console.log(err));
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
    TranslatedContent.findByIdAndDelete(req.params.id)
        .then(() => res.json('translated content deleted'))
        .catch((err) => console.log(err));
});

const validateTranslatedContent = (translatedContentObject: unknown) => {
    return translatedContentObject;
};

