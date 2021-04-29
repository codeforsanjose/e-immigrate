const { response } = require('express');
const express = require('express');
const router = express.Router();
const QuestionnaireResponse = require('../models/questionnaireResponse');
const sendEmail = require('./sendEmail/sendEmail');
const ObjectID = require('mongodb').ObjectID;

router.route('/').get((req, res) => {
    QuestionnaireResponse.find()
        .then((allResponses) => {
            const responsesInfo = { responses: allResponses };
            res.json(responsesInfo);
        })
        .catch((err) => console.log(err));
});

router.route('/email').post((req, res) => {
    const responsesToEmail = req.body.responsesToEmail;
    for (const response of responsesToEmail) {
        //send email
        const { questionnaireResponse = {}, flag } = response;
        const { email = '' } = questionnaireResponse;
        const tempUpdatedSuccessEmail = {
            ...response,
            emailSent: true,
        };
        QuestionnaireResponse.updateOne(
            { _id: ObjectID(response._id) },
            tempUpdatedSuccessEmail,
            (err, raw) => {
                if (err) {
                    console.log('updated something err is', err);
                }
            }
        );
    }
    res.json({ msg: 'success' });
});

router.route('/excel-download-status').post((req, res) => {
    const responsesToUpdate = req.body.responsesToUpdate;
    for (const response of responsesToUpdate) {
        const tempUpdatedResponse = {
            ...response,
            responseDownloadedToExcel: true,
        };
        QuestionnaireResponse.updateOne(
            { _id: ObjectID(response._id) },
            tempUpdatedResponse,
            (err, raw) => {
                if (err) {
                    console.log('updated something err is', err);
                }
            }
        );
    }
    res.json({ msg: 'success' });
});

router.route('/assign-agency').post((req, res) => {
    const responseToAssignAgency = req.body.responsesToEmail;
    for (const response of responseToAssignAgency) {
        //send email
        const { questionnaireResponse = {}, flag } = response;
        QuestionnaireResponse.updateOne(
            { _id: ObjectID(response._id) },
            response,
            (err, raw) => {
                if (err) {
                    console.log('updated something err is', err);
                }
            }
        );
    }
    res.json({ msg: 'success' });
});

router.route('/:id').get((req, res) => {
    QuestionnaireResponse.findById(req.params.id)
        .then((questionnaireResponse) => res.json(questionnaireResponse))
        .catch((err) => console.log(err));
});

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const language = req.body.language;
    const questionnaireResponse = req.body.questionnaireResponse;

    //todo: extract userEmail, name from request.body

    const userEmail = '';
    const userFirstName = '';

    const newQuestionnaireResponse = new QuestionnaireResponse({
        title,
        language,
        questionnaireResponse,
    });

    newQuestionnaireResponse
        .save()
        .then(() => {
            // sendEmail(userEmail, userFirstName);
            res.json('QuestionnaireResponse response added');
        })
        .catch((err) => console.log(err));
});

router.route('/:id').delete((req, res) => {
    QuestionnaireResponse.findByIdAndDelete(req.params.id)
        .then((users) => res.json('questionnaire response Deleted'))
        .catch((err) => console.log(err));
});

router.route('');

module.exports = router;
