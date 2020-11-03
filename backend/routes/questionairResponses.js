const express = require('express');
const router = express.Router();
const Questionnaire = require('../models/questionnaireResponse');

router.route('/').get((req, res) => {
    Questionnaire.find()
        .then((allResponses) => {
            const responsesInfo = { responses: allResponses };
            res.json(responsesInfo);
        })
        .catch((err) => console.log(err));
});

router.route('/:id').get((req, res) => {
    Questionnaire.findById(req.params.id)
        .then((questionnaireResponse) => res.json(questionnaireResponse))
        .catch((err) => console.log(err));
});

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const questionnaireResponses = req.body.questionnaireResponses;

    const newQuestionnaireResponse = new Questionnaire({
        title,
        questionnaireResponses,
    });

    newQuestionnaireResponse
        .save()
        .then(() => res.json('questionnaire response added'))
        .catch((err) => console.log(err));
});


router.route('/:id').delete((req, res) => {
    Questionnaire.findByIdAndDelete(req.params.id)
        .then((users) => res.json('questionnaire response Deleted'))
        .catch((err) => console.log(err));
});

router.route('');

module.exports = router;
