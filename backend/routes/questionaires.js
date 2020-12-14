const express = require('express');
const router = express.Router();
const Questionnaires = require('../models/questionnaires');

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
    console.log('req.body :>> ', req.body);
    const title = req.body.title;
    res.json('questionnaire response added');

    // const newQuestionnaireResponse = new Questionnaire({
    //     title,
    //     questionnaireResponses,
    // });

    // newQuestionnaireResponse
    //     .save()
    //     .then(() => res.json('questionnaire response added'))
    //     .catch((err) => console.log(err));
});

router.route('/:id').delete((req, res) => {
    Questionnaires.findByIdAndDelete(req.params.id)
        .then((users) => res.json('questionnaire response Deleted'))
        .catch((err) => console.log(err));
});

router.route('');

module.exports = router;
