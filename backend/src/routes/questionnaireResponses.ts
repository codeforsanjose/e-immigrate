import { response } from 'express';
import express from 'express';
import { QuestionnaireResponse } from '../models/questionnaireResponse.js';
import { sendMassEmails } from './sendEmail/sendEmail.js';
import { Types } from 'mongoose';
import { emailContents, isEmailContentLanguage } from '../routes/sendEmail/emailContent.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { emailSender } from '../features/emails/emailSender.js';
import { ArrayElementOf } from '../types/ArrayElementOf.js';
import { isSendGridResponseError } from '../types/SendGridResponseError.js';
import { z } from 'zod';
const router = express.Router();
export { router as questionnaireResponsesRouter };
const AddSchema = z.object({
    title: z.string(),
    language: z.string(),
    questionnaireResponse: z.record(z.string(), z.string().nullable()),
})
//TODO: revisit access control
router.route('/add').post(async (req, res) => {
    const reqBody = AddSchema.parse(req.body);
    const {
        language,
        questionnaireResponse,
        title,
    } = reqBody;
    console.log({
        origBody: req.body,
        questionnaireResponse,
    })
    const newQuestionnaireResponse = new QuestionnaireResponse({
        title,
        language,
        questionnaireResponse,
    });

    await newQuestionnaireResponse.save()
    res.json('QuestionnaireResponse response added');
});

router.use(authMiddleware); //all apis AFTER this line will require authentication as implemented in auth.js

function getAllResponses() {
    return QuestionnaireResponse.find({
        $or: [{ deleted: { $exists: false } }, { deleted: false }],
    });
}

type AdminTemp = {
    questionnaires: Array<string>;
}
function getResponsesForAdmin(admin: AdminTemp) {
    return QuestionnaireResponse.find({
        title: { $in: admin.questionnaires },
        $or: [{ deleted: { $exists: false } }, { deleted: false }],
    });
}

router.route('/').get(async (req, res) => {
    // const getResponses = req.user.issuper
    //     ? getAllResponses()
    //     : getResponsesForAdmin(req.user);

    const qResponses = await getAllResponses();
    const updatedResponses = qResponses.filter((item) => {
        return !item.title?.toLowerCase().includes('spring_2021');
    });
    console.log('ohh boy', updatedResponses);
    const responsesInfo = { responses: updatedResponses };
    res.json(responsesInfo);
});

// source https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

type QuestionnaireResponseElement = ArrayElementOf<Awaited<ReturnType<typeof getAllResponses>>>;

router.route('/email').post(async (req, res) => {
    // const getResponses = req.user.issuper
    //     ? getAllResponses()
    //     : getResponsesForAdmin(req.user);
    const qResponses = await getAllResponses();
    const responsesToEmail = qResponses.filter((item) => !item.emailSent);
    const totalEmailsToSend = responsesToEmail.length;
    const messsagesToSend = responsesToEmail
        .filter((response) => {
            const { 
                questionnaireResponse,
                language: responseLanguage = 'en',
            } = response;
            const { email = '' } = questionnaireResponse;
            if (!isEmailContentLanguage(responseLanguage)) return false;
            return email !== '' && validateEmail(email.toLowerCase());
        })
        .map((response) => {
            const {
                questionnaireResponse = {},
                flag,
                language = 'en',
            } = response;
            if (!isEmailContentLanguage(language)) throw new Error('should not happen');

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
                from: emailSender,
                subject: 'Your Response has been received',
                html: translatedContents,
            };
            return msg;
        });
    
    try {

        const result = await sendMassEmails(messsagesToSend);
        await updateUserResponsesEmailFlag(responsesToEmail, res);
    }
    catch (emailErrors) {
        console.log('emails ERRORED', emailErrors);
        if (!isSendGridResponseError(emailErrors)) {
            throw emailErrors;
        }
        console.log('em', emailErrors.response.body);
        res.json({
            msg:
                'Emails errored attempted to send ' +
                totalEmailsToSend,
            errors: emailErrors.response.body,
        });
    }
});

const questionKeysThatAreNotRedFlagsButInARedFlagQuestionnaire = [
    'male',
    'still_married_to_that_citizen',
    'receive_public_benefits',
    'live_US_18-26_and_are_26-31',
    'selective_service',
    'green_card_through_marriage',
] as const;
type RedFlagKey = ArrayElementOf<typeof questionKeysThatAreNotRedFlagsButInARedFlagQuestionnaire>;
function isRedFlagKey(value: unknown): value is RedFlagKey {
    if (value == null || typeof value !== 'string') return false;
    return questionKeysThatAreNotRedFlagsButInARedFlagQuestionnaire.includes(value as RedFlagKey);
}
function getUpdatedFlag(userResponse: Record<RedFlagKey, string>) {
    
    return Object.entries(userResponse).reduce((acc, [key, value]) => {
        return !isRedFlagKey(key)
            ? value.toUpperCase() === 'YES'
                ? true
                : acc
            : acc;
    }, false);
}
async function updateUserResponsesEmailFlag(responsesToEmail: Array<QuestionnaireResponseElement>, res: express.Response) {
    const totalEmailsToSend = responsesToEmail.length;
    let emailsSentCurrent = 0;
    let errors = new Map<Types.ObjectId, unknown>();
    function addError(key: Types.ObjectId, value: unknown) {
        // errors = {
        //     ...errors,
        //     [key]: value,
        // }
        errors.set(key, value);
    }
    for (const response of responsesToEmail) {
        // pull out only what we need since coming from backend not frontne response contains lots more than what we need
        const {
            _id, title, language, flag, flagOverride = false, createdAt, updatedAt, questionnaireResponse, agency = '', responseDownloadedToExcel,
        } = response;
        const updatedFlag = flag === null ? getUpdatedFlag(questionnaireResponse) : flag;
        const tempUpdatedSuccessEmail = {
            _id: _id,
            title: title,
            emailSent: true,
            language: language,
            flag: updatedFlag,
            flagOverride: flagOverride,
            agency: agency,
            questionnaireResponse: questionnaireResponse,
            responseDownloadedToExcel: responseDownloadedToExcel,
            createdAt,
            updatedAt,
        };
        try {
            await QuestionnaireResponse.updateOne(
                { _id: response._id },
                tempUpdatedSuccessEmail,
                (err: unknown, raw: unknown) => {
                    emailsSentCurrent = emailsSentCurrent + 1;
                    if (err) {
                        addError(response._id, err);
                        console.log('updated something err is', err);
                    }
                    if (emailsSentCurrent === totalEmailsToSend) {
                        res.json({
                            msg: 'Success attempted to send ' +
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
}
const AssignAgencySchema = z.object({
    responsesToEmail: z.array(z.object({
        _id: z.string(),
        agency: z.string(),
        responseDownloadedToExcel: z.boolean(),
        questionnaireResponse: z.record(z.string(), z.string()),
        flagOverride: z.boolean().nullish(),
        flag: z.boolean().nullish(),
        emailSent: z.boolean().nullish(),
        createdAt: z.number(),
        updatedAt: z.number(),
    })),
})
router.route('/assign-agency').post(async (req, res) => {
    const {
        responsesToEmail: responseToAssignAgency,
    } = AssignAgencySchema.parse(req.body);
    for (const response of responseToAssignAgency) {
        await QuestionnaireResponse.updateOne(
            { _id: response._id },
            response,
            (err: unknown, raw: unknown) => {
                if (err) {
                    console.log('updated agency err is', err);
                }
            }
        );
    }
    res.json({ msg: 'success' });
});
router.route('/assign-flag').post(async (req, res) => {
    const responseToAssignFlag = req.body.responsesToUpdate;
    for (const response of responseToAssignFlag) {
        await QuestionnaireResponse.updateOne(
            { _id: response._id },
            response,
            (err: unknown, raw: unknown) => {
                if (err) {
                    console.log('updated flag err is', err);
                }
            }
        );
    }
    res.json({ msg: 'success' });
});
router.route('/assign-email').post(async (req, res) => {
    const responseToEmailReset = req.body.responsesToUpdate;
    for (const response of responseToEmailReset) {
        await QuestionnaireResponse.updateOne(
            { _id: response._id },
            { ...response, emailSent: false },
            (err: unknown, raw: unknown) => {
                if (err) {
                    console.log('updated email to false err is', err);
                }
            }
        );
    }
    res.json({ msg: 'success' });
});

router.route('/:id').get(async (req, res) => {
    const questionnaireResponse= await QuestionnaireResponse.findById(req.params.id)
    res.json(questionnaireResponse);
});

router.route('/:id').delete(async (req, res) => {
    const users = await QuestionnaireResponse.findByIdAndDelete(req.params.id)
    res.json('questionnaire response Deleted');
});

router.route('/delete/:id').put(async (req, res) => {
    const questionnaireResponse = await QuestionnaireResponse.findByIdAndUpdate(

        req.params.id,
        { deleted: true });
    if (questionnaireResponse == null) {
        console.error('Failed to find');
        return;
    } 
    console.log(
        'questionnaire response ' +
            questionnaireResponse._id +
            ' soft-deleted'
    );
    res.status(202).json({
        msg: 'questionnaire response deleted softly',
    });
});

router.route('');

