const express = require('express');
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

router.route('/:title.:language').get((req, res) => {
    Questionnaires.findOne({
        title: req.params.title,
        language: req.params.language,
    })
        .then((questionnaires) => res.json(questionnaires))
        .catch((err) => console.log(err));
});

router.route('/add').post((req, res) => {
    // to-do:
    // validateQuestionnaire(req.body);

    const title = req.body.title;
    const language = req.body.language;
    const questions = req.body.questions;
    res.json('questionnaire added');

    const insertNewQuestionnaire = () => {
        Questionnaires.insertMany({ title, language, questions })
            .then(() => console.log('questionnaire inserted'))
            .catch((err) => console.log(err));
    };

    const removeExistingQuestionnaires = (_id) => {
        Questionnaires.findByIdAndDelete({ _id })
            .then(() => console.log('questionnaire deleted'))
            .catch((err) => console.log(err));
    };

    Questionnaires.find({ title, language }, function (err, result) {
        if (err) {
            res.send(err);
        } else if (result.length !== 0) {
            removeExistingQuestionnaires(result[0]._id);
            insertNewQuestionnaire();
        } else {
            insertNewQuestionnaire();
        }
    });
});

router.route('/:id').delete((req, res) => {
    Questionnaires.findByIdAndDelete(req.params.id)
        .then(() => res.json('questionnaire deleted'))
        .catch((err) => console.log(err));
});

const validateQuestionnaire = (questionnaireObject) => {
    return questionnaireObject;
};

module.exports = router;
