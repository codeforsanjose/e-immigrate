const express = require('express');
const router = express.Router();
const TranslatedContent = require('../../models/translatedContent');

router.route('/').get((req, res) => {
    translatedContent
        .find()
        .then((allTranslatedContent) => {
            const responsesInfo = { responses: allTranslatedContent };
            res.json(responsesInfo);
        })
        .catch((err) => console.log(err));
});

router.route('/:title').get((req, res) => {
    TranslatedContent.findOne({ title: req.params.title })
        .then((translatedContent) => res.json(translatedContent))
        .catch((err) => console.log(err));
});

router.route('/add').post((req, res) => {
    // to-do:
    // validate(req.body);

    const title = req.body.title;
    const content = req.body.content;
    res.json('translated content added');

    const insertNewTranslatedContent = () => {
        TranslatedContent.insertMany({ title, content })
            .then(() => console.log('translated content inserted'))
            .catch((err) => console.log(err));
    };

    const removeExistingTranslatedContent = (_id) => {
        TranslatedContent.findByIdAndDelete({ _id })
            .then(() => console.log('translated content deleted'))
            .catch((err) => console.log(err));
    };

    TranslatedContent.find({ title }, function (err, result) {
        if (err) {
            res.send(err);
        } else if (result.length !== 0) {
            removeExistingTranslatedContent(result[0]._id);
            insertNewTranslatedContent();
        } else {
            insertNewTranslatedContent();
        }
    });
});

router.route('/:id').delete((req, res) => {
    TranslatedContent.findByIdAndDelete(req.params.id)
        .then(() => res.json('translated content deleted'))
        .catch((err) => console.log(err));
});

const validateTranslatedContent = (translatedContentObject) => {
    return translatedContentObject;
};

module.exports = router;
