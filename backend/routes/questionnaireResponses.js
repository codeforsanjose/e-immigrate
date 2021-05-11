const { response } = require('express');
const express = require('express');
const router = express.Router();
const QuestionnaireResponse = require('../models/questionnaireResponse');
const sendMassEmails = require('./sendEmail/sendEmail');
const ObjectID = require('mongodb').ObjectID;
const emailContents = require('../routes/sendEmail/emailContent.js');
const senderEmail = process.env.SENDER_EMAIL;
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
    const totalEmailsToSend = responsesToEmail.length;
    let emailsSentCurrent = 0;
    let errors = {};
    const messsagesToSend = responsesToEmail.map((response) => {
        const { questionnaireResponse = {}, flag, language = 'en' } = response;
        const { email = '' } = questionnaireResponse;
        if (email !== '') {
            const colorFlag = flag ? 'red' : 'green';
            const emailContentForResponse = emailContents[language][colorFlag];
            const translatedContents =
                emailContentForResponse && emailContentForResponse === ''
                    ? emailContents['en'][colorFlag]
                    : emailContentForResponse;
            const msg = {
                to: email,
                from: senderEmail,
                subject: 'Your Response has been received',
                html: translatedContents,
            };
            return msg;
        }
    });
    sendMassEmails(messsagesToSend)
        .then((result) => {
            console.log('emails sent', result);
            for (const response of responsesToEmail) {
                const tempUpdatedSuccessEmail = {
                    ...response,
                    emailSent: true,
                };

                QuestionnaireResponse.updateOne(
                    { _id: ObjectID(response._id) },
                    tempUpdatedSuccessEmail,
                    (err, raw) => {
                        emailsSentCurrent = emailsSentCurrent + 1;
                        if (err) {
                            console.log('updated something err is', err);
                        }
                        if (emailsSentCurrent === totalEmailsToSend) {
                            res.json({
                                msg: 'attempted to send ' + emailsSentCurrent,
                                errors: errors,
                            });
                        }
                    }
                );
            }
        })
        .catch((emailErrors) => {
            console.log('emails ERRORED', result);
            res.json({
                msg: 'attempted to send ' + totalEmailsToSend,
                errors: emailErrors,
            });
        });
});

router.route('/assign-agency').post((req, res) => {
    const responseToAssignAgency = req.body.responsesToEmail;
    for (const response of responseToAssignAgency) {
        QuestionnaireResponse.updateOne(
            { _id: ObjectID(response._id) },
            response,
            (err, raw) => {
                if (err) {
                    console.log('updated agency err is', err);
                }
            }
        );
    }
    res.json({ msg: 'success' });
});
router.route('/assign-flag').post((req, res) => {
    const responseToAssignFlag = req.body.responsesToUpdate;
    for (const response of responseToAssignFlag) {
        QuestionnaireResponse.updateOne(
            { _id: ObjectID(response._id) },
            response,
            (err, raw) => {
                if (err) {
                    console.log('updated flag err is', err);
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
