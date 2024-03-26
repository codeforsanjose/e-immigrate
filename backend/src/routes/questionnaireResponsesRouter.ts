import express from 'express';
import { z } from 'zod';

import { QuestionnaireResponse } from '../models/questionnaireResponse.js';
import { sendMassEmails } from '../features/emails/sendEmail.js';
import { isEmailContentLanguage } from '../features/emails/emailContentLanguages.js';
import { emailContents } from "../features/emails/emailContents.js";
import { authMiddleware } from '../middleware/authMiddleware.js';
import { emailSender } from '../features/emails/emailSender.js';
import { ArrayElementOf } from '../types/ArrayElementOf.js';
import { isSendGridResponseError } from '../types/SendGridResponseError.js';
import { routeLogger, scopedLogger } from '../features/logging/logger.js';
const router = express.Router();
export { router as questionnaireResponsesRouter };
const AddSchema = z.object({
    title: z.string(),
    language: z.string(),
    questionnaireResponse: z.record(z.string(), z.string().nullable()),
});

// TODO: revisit access control
router.route('/add').post(async (req, res) => {
    const logger = routeLogger('addQuestionnaireResponse');

    const reqBody = AddSchema.parse(req.body);
    const {
        language,
        questionnaireResponse,
        title,
    } = reqBody;
    logger.info({
        origBody: req.body,
        questionnaireResponse,
    }, 'body');
    const newQuestionnaireResponse = new QuestionnaireResponse({
        title,
        language,
        questionnaireResponse,
    });

    await newQuestionnaireResponse.save();
    res.json('QuestionnaireResponse response added');
});

router.use(authMiddleware); // all apis AFTER this line will require authentication as implemented in auth.js

function getAllResponses() {
    return QuestionnaireResponse.find({
        $or: [{ deleted: { $exists: false } }, { deleted: false }],
    });
}

function getAllResponsesForIds(ids: Array<string>) {
    return QuestionnaireResponse.find({
        $and: [
            {
                $or: [{ deleted: { $exists: false } }, { deleted: false }],
            },
            {
                _id: { $in: ids },
            },
        ],
    });
}

router.route('/').get(async (req, res) => {
    const logger = routeLogger('getAllQuestionnaireResponse');
    logger.trace('CALLED');
    // const getResponses = req.user.issuper
    //     ? getAllResponses()
    //     : getResponsesForAdmin(req.user);

    const qResponses = await getAllResponses();
    const updatedResponses = qResponses.filter((item) => {
        return !(item.title?.toLowerCase().includes('spring_2021') ?? false);
    });
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
    const logger = routeLogger('emailQuestionnaireResponse');
    // const getResponses = req.user.issuper
    //     ? getAllResponses()
    //     : getResponsesForAdmin(req.user);
    const qResponses = await getAllResponses();
    const responsesToEmail = qResponses.filter((item) => item.emailSent !== true);
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
                questionnaireResponse,
                flag,
                language = 'en',
            } = response;
            if (!isEmailContentLanguage(language)) throw new Error('should not happen');

            const { email } = questionnaireResponse;
            const colorFlag = flag === true ? 'red' : 'green';
            const emailContentForResponse = emailContents[language] != null
                ? emailContents[language][colorFlag]
                : emailContents.en[colorFlag];
            const translatedContents =
                (emailContentForResponse == null || emailContentForResponse.length === 0)
                    ? emailContents.en[colorFlag]
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
        await sendMassEmails(messsagesToSend);
        await updateUserResponsesEmailFlag(responsesToEmail, res);
    }
    catch (emailErrors) {
        logger.error(emailErrors, 'emails ERRORED');
        if (!isSendGridResponseError(emailErrors)) {
            throw emailErrors;
        }
        logger.error(emailErrors.response.body, 'em');
        res.json({
            msg: `Emails errored attempted to send ${totalEmailsToSend}`,
            errors: emailErrors.response.body,
        });
    }
});

const questionKeysThatAreNotRedFlagsButInARedFlagQuestionnaire = [
    // 'male',
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


function getUpdatedFlag(userResponse: Partial<Record<RedFlagKey, string | null | undefined>>) {
    return Object.entries(userResponse).reduce((acc, [key, value]) => {
        return !isRedFlagKey(key)
            ? value?.toUpperCase() === 'YES'
                ? true
                : acc
            : acc;
    }, false);
}
async function updateUserResponsesEmailFlag(responsesToEmail: Array<QuestionnaireResponseElement>, res: express.Response) {
    const logger = scopedLogger('updateUserResponsesEmailFlag');
    const totalEmailsToSend = responsesToEmail.length;
    let emailsSentCurrent = 0;
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
        const updatedFlag = flag ?? getUpdatedFlag(questionnaireResponse);
        const tempUpdatedSuccessEmail = {
            _id,
            title,
            emailSent: true,
            language,
            flag: updatedFlag,
            flagOverride,
            agency,
            questionnaireResponse,
            responseDownloadedToExcel,
            createdAt,
            updatedAt,
        };
        try {
            await QuestionnaireResponse.updateOne(
                { _id: response._id },
                tempUpdatedSuccessEmail);
            emailsSentCurrent += 1;
            if (emailsSentCurrent === totalEmailsToSend) {
                res.json({
                    msg: `Success attempted to send ${emailsSentCurrent}`,
                });
            }
        }
        catch (mongoError) {
            logger.error(mongoError, 'mongo error here');
            res.json({
                msg: `MongoError attempted to send ${emailsSentCurrent}`,
                errors: mongoError,
            });
        }
    }
}

const AssignAgencySchema = z.array(z.object({
    id: z.string(),
    agency: z.string().nullish(),
}));

router.route('/assign-agency').post(async (req, res) => {
    const logger = routeLogger('agencyAssignURL');
    const requestBody = AssignAgencySchema.parse(req.body);
    for (const change of requestBody) {
        try {
            await QuestionnaireResponse.updateOne({ _id: change.id }, {
                agency: change.agency ?? null,
            });
        }
        catch (err) {
            logger.error({
                request: change,
                error: err,
            }, 'Failed to update an agency');
        }
    }
    logger.info(requestBody, 'Successfully assigned agency');
    res.json(await getAllResponsesForIds(requestBody.map(x => x.id)));
});

const AssignFlagSchema = z.array(z.object({
    id: z.string(),
    flag: z.boolean().nullish(),
}));

router.route('/assign-flag').post(async (req, res) => {
    const logger = routeLogger('assignResponseFlag');
    const requestBody = AssignFlagSchema.parse(req.body);
    for (const change of requestBody) {
        try {
            await QuestionnaireResponse.updateOne({ _id: change.id }, {
                flag: change.flag ?? null,
            });
        }
        catch (err) {
            logger.error({
                request: change,
                error: err,
            }, 'Failed to update a flag');
        }
    }
    logger.info(requestBody, 'Successfully assigned flag');
    res.json(await getAllResponsesForIds(requestBody.map(x => x.id)));
});

const AssignEmailSchema = z.array(z.object({
    id: z.string(),
    emailSent: z.boolean().nullish(),
}));

router.route('/assign-email').post(async (req, res) => {
    const logger = routeLogger('assignEmail');
    const requestBody = AssignEmailSchema.parse(req.body);
    
    for (const change of requestBody) {
        try {
            await QuestionnaireResponse.updateOne({ _id: change.id }, {
                emailSent: change.emailSent ?? false,
            });
        }
        catch (err) {
            logger.error({
                request: change,
                error: err,
            }, `Failed to update the 'email sent' field`);
        }
    }
    logger.info(requestBody, 'Successfully assigned emailSent');
    res.json(await getAllResponsesForIds(requestBody.map(x => x.id)));
});

router.route('/:id').get(async (req, res) => {
    const questionnaireResponse = await QuestionnaireResponse.findById(req.params.id);
    res.json(questionnaireResponse);
});

router.route('/:id').delete(async (req, res) => {
    const logger = routeLogger('hardDeleteQuestionnaireResponse');
    await QuestionnaireResponse.findByIdAndDelete(req.params.id);
    logger.info({
        id: req.params.id,
    }, 'questionnaire response Deleted');
    res.json('questionnaire response Deleted');
});

// SOFT DELETE
router.route('/delete/:id').put(async (req, res) => {
    const logger = routeLogger('softDeleteQuestionnaireResponse');
    const questionnaireResponse = await QuestionnaireResponse.findByIdAndUpdate(

        req.params.id,
        { deleted: true });
    if (questionnaireResponse == null) {
        logger.error({
            id: req.params.id,
        }, 'Failed to find');
        return;
    }
    logger.info({
        paramId: req.params.id,
        dbId: questionnaireResponse._id.toString(),
    }, `questionnaire response soft-deleted`);
    res.status(202).json({
        msg: 'questionnaire response deleted softly',
    });
});

router.route('');
