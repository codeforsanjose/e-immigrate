const { response } = require('express');
const express = require('express');
const router = express.Router();
const QuestionnaireResponse = require('../models/questionnaireResponse');
const sendMassEmails = require('./sendEmail/sendEmail');
const ObjectID = require('mongodb').ObjectID;
const emailContents = require('../routes/sendEmail/emailContent.js');
const senderEmail = process.env.SENDER_EMAIL;

//TODO: revisit access control
router.route('/add').post((req, res) => {
    const title = req.body.title;
    const language = req.body.language;
    const questionnaireResponse = req.body.questionnaireResponse;
    const newQuestionnaireResponse = new QuestionnaireResponse({
        title,
        language,
        questionnaireResponse,
    });

    newQuestionnaireResponse
        .save()
        .then(() => {
            res.json('QuestionnaireResponse response added');
        })
        .catch((err) => console.log(err));
});

const auth = require('../middleware/auth');
router.use(auth); //all apis AFTER this line will require authentication as implemented in auth.js

const getAllResponses = () => {
    return QuestionnaireResponse.find({
        $or: [{ deleted: { $exists: false } }, { deleted: false }],
    });
};

const getResponsesForAdmin = (admin) => {
    return QuestionnaireResponse.find({
        title: { $in: admin.questionnaires },
        $or: [{ deleted: { $exists: false } }, { deleted: false }],
    });
};

router.route('/').get((req, res) => {
    // const getResponses = req.user.issuper
    //     ? getAllResponses()
    //     : getResponsesForAdmin(req.user);

    const getResponses = getAllResponses();
    getResponses
        .then((qResponses) => {
            const updatedResponses = qResponses.filter((item) => {
                return !item.title.toLowerCase().includes('spring_2021');
            });
            console.log('ohh boy', updatedResponses);
            const responsesInfo = { responses: updatedResponses };
            res.json(responsesInfo);
        })
        .catch((err) => console.log(err));
});

// source https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

router.route('/email').post((req, res) => {
    // const getResponses = req.user.issuper
    //     ? getAllResponses()
    //     : getResponsesForAdmin(req.user);
    const getResponses = getAllResponses();
    getResponses.then((qResponses) => {
        const responsesToEmail = qResponses.filter((item) => !item.emailSent);
        const totalEmailsToSend = responsesToEmail.length;
        const messsagesToSend = responsesToEmail
            .filter((response) => {
                const { questionnaireResponse } = response;
                const { email = '' } = questionnaireResponse;
                return email !== '' && validateEmail(email.toLowerCase());
            })
            .map((response) => {
                const {
                    questionnaireResponse = {},
                    flag,
                    language = 'en',
                } = response;
                const { email = '' } = questionnaireResponse;
                const colorFlag = flag ? 'red' : 'green';
                const emailContentForResponse = emailContents[language]
                    ? emailContents[language][colorFlag]
                    : emailContents['en'][colorFlag];
                const translatedContents =
                    emailContentForResponse ||
                    emailContentForResponse === '' ||
                    emailContentForResponse.length === 0
                        ? emailContents['en'][colorFlag]
                        : emailContentForResponse;
                const msg = {
                    to: email.toLowerCase(),
                    from: senderEmail,
                    subject: 'Your Response has been received',
                    html: translatedContents,
                };
                return msg;
            });
        sendMassEmails(messsagesToSend)
            .then((result) => {
                updateUserResponsesEmailFlag(responsesToEmail, res);
            })
            .catch((emailErrors) => {
                console.log('emails ERRORED', emailErrors);
                console.log('em', emailErrors.response.body);
                if (emailErrors) {
                    res.json({
                        msg:
                            'Emails errored attempted to send ' +
                            totalEmailsToSend,
                        errors: emailErrors.response.body,
                    });
                }
            });
    });
});
const getUpdatedFlag = (userResponse) => {
    const questionKeysThatAreNotRedFlagsButInARedFlagQuestionnaire = [
        'male',
        'still_married_to_that_citizen',
        'receive_public_benefits',
        'live_US_18-26_and_are_26-31',
        'selective_service',
        'green_card_through_marriage',
    ];
    return Object.entries(userResponse).reduce((acc, [key, value]) => {
        return !questionKeysThatAreNotRedFlagsButInARedFlagQuestionnaire.includes(
            key
        )
            ? value.toUpperCase() === 'YES'
                ? true
                : acc
            : acc;
    }, false);
};
const updateUserResponsesEmailFlag = (responsesToEmail, res) => {
    const totalEmailsToSend = responsesToEmail.length;
    let emailsSentCurrent = 0;
    let errors = {};

    for (const response of responsesToEmail) {
        // pull out only what we need since coming from backend not frontne response contains lots more than what we need
        const {
            _id,
            title,
            language,
            flag,
            flagOverride = false,
            createdAt,
            updatedAt,
            questionnaireResponse,
            agency = '',
            responseDownloadedToExcel,
        } = response;
        const updatedFlag =
            flag === null ? getUpdatedFlag(questionnaireResponse) : flag;
        const tempUpdatedSuccessEmail = {
            _id: _id,
            title: title,
            emailSent: true,
            language: language,
            flag: updatedFlag,
            flagOverride: flagOverride,
            emailSent: true,
            agency: agency,
            questionnaireResponse: questionnaireResponse,
            responseDownloadedToExcel: responseDownloadedToExcel,
            createdAt,
            updatedAt,
        };
        try {
            QuestionnaireResponse.updateOne(
                { _id: ObjectID(response._id) },
                tempUpdatedSuccessEmail,
                (err, raw) => {
                    emailsSentCurrent = emailsSentCurrent + 1;
                    if (err) {
                        errors[response._id] = err;
                        console.log('updated something err is', err);
                    }
                    if (emailsSentCurrent === totalEmailsToSend) {
                        res.json({
                            msg:
                                'Success attempted to send ' +
                                emailsSentCurrent,
                            errors: errors,
                        });
                    }
                }
            );
        } catch (mongoError) {
            console.log('mongo error here', mongoError);
            res.json({
                msg: 'MongoError attempted to send ' + emailsSentCurrent,
                errors: mongoError,
            });
        }
    }
};
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
router.route('/assign-email').post((req, res) => {
    const responseToEmailReset = req.body.responsesToUpdate;
    for (const response of responseToEmailReset) {
        QuestionnaireResponse.updateOne(
            { _id: ObjectID(response._id) },
            { ...response, emailSent: false },
            (err, raw) => {
                if (err) {
                    console.log('updated email to false err is', err);
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

router.route('/:id').delete((req, res) => {
    QuestionnaireResponse.findByIdAndDelete(req.params.id)
        .then((users) => res.json('questionnaire response Deleted'))
        .catch((err) => console.log(err));
});

router.route('/delete/:id').put((req, res) => {
    QuestionnaireResponse.findByIdAndUpdate(
        req.params.id,
        { deleted: true },
        function (err, questionnaireResponse) {
            if (err) {
                console.log(err);
            } else {
                console.log(
                    'questionnaire response ' +
                        questionnaireResponse._id +
                        ' soft-deleted'
                );
                res.status(202).json({
                    msg: 'questionnaire response deleted softly',
                });
            }
        }
    );
});

router.route('');

module.exports = router;
