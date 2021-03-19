const express = require('express');
const router = express.Router();
const Questionnaire = require('../models/questionnaireResponse');
const sendEmail = require('./sendEmail/sendEmail');

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
    const questionnaireResponse = req.body.questionnaireResponse;

    //todo: extract userEmail, name from request.body

    const userEmail = '';
    const userFirstName = '';

    const newQuestionnaireResponse = new Questionnaire({
        title,
        questionnaireResponse,
    });

    newQuestionnaireResponse
        .save()
        .then(() => {
            // sendEmail(userEmail, userFirstName);
            res.json('questionnaire response added');
        })
        .catch((err) => console.log(err));
});

router.route('/:id').delete((req, res) => {
    Questionnaire.findByIdAndDelete(req.params.id)
        .then((users) => res.json('questionnaire response Deleted'))
        .catch((err) => console.log(err));
});

router.route('');

module.exports = router;
