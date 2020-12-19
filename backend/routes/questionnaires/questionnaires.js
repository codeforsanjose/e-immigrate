const express = require('express');
const Questionnaire = require('../../models/questionnaireResponse');
const router = express.Router();
const Questionnaires = require('../../models/questionnaires');

router.route('/').get((req, res) => {
    Questionnaires.find()
        .then((allQuestionnaires) => {
            const responsesInfo = { responses: allQuestionnaires };
            res.json(responsesInfo);
        })
        .catch((err) => console.log(err));
});

router.route('/:id').get((req, res) => {
    Questionnaires.findById(req.params.id)
        .then((questionnaires) => res.json(questionnaires))
        .catch((err) => console.log(err));
});

router.route('/add').post((req, res) => {
    // validateQuestionnaire(req.body);

    const title = req.body.title;
    const questions = req.body.questions;
    res.json('questionnaire response added');

    const newQuestionnaires = new Questionnaires({
        title,
        questions,
    });

    newQuestionnaires
        .save()
        .then((data) => console.log('save data: ', data))
        .catch((err) => console.log('error:', err));
});

router.route('/:id').delete((req, res) => {
    Questionnaires.findByIdAndDelete(req.params.id)
        .then((users) => res.json('questionnaire response Deleted'))
        .catch((err) => console.log(err));
});

router.route('');

const validateQuestionnaire = (questionnaireOject) => {
    return questionnaireOject;
};

module.exports = router;
