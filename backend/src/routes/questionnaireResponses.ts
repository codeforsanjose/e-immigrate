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
            msg:
                'Emails errored attempted to send ' +
                totalEmailsToSend,
            errors: emailErrors.response.body,
        });
    }
});

/*
 questionnaireResponse: {
    "languageCode": "en",
    "green_card_through_marriage": "No",
    "legal_resident_date": null,
    "gender": "Male",
    "preferred_language": "English",
    "full_name": "dasd",
    "birth_country": "adsasd",
    "US_zipcode": "12345",
    "mobile_phone": "3234243555",
    "age": "68",
    "ethnicity": "adasd",
    "email": "asdasd",
    "how_did_you_hear_about_event": "Word of mouth (friends/family/etc.) ",
    "receive_public_benefits": "No",
    "contact_with_police": "No",
    "habitual_alcoholic_drugs": "No",
    "money_from_illegal_gambling": "No",
    "contact_with_immigration_officer": "No",
    "helped_enter_or_entered_US_illegally": "No",
    "married_to_multiple_people_same_time": "No",
    "failed_support_kids_pay_alimony": "No",
    "asylum_travel_back_home_country": "No",
    "deported_removed_excluded_from_US": "No",
    "lied_to_obtain_immigrant_benefit": "No",
    "lied_to_obtain_welfare_benefit": "No",
    "left_US_>6mo_while_LPR": "No",
    "owed_taxes_since_LPR": "No",
    "taxes_payment_plan": "No",
    "genocide_torture_killing_hurting": "No",
    "court-martialed_disciplinced_in_military": "No",
    "US_citizen_registered_voted": "No",
    "associated_terrorist_orgs_gangs": "No",
    "live_US_18-26_and_are_26-31": "No",
    "selective_service": "No"
}
*/
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

const ResponseSchema = z.object({
    _id: z.string(),
    agency: z.string(),
    responseDownloadedToExcel: z.boolean(),
    questionnaireResponse: z.record(z.string(), z.string().nullable()),
    flagOverride: z.boolean().nullish(),
    flag: z.boolean().nullish(),
    emailSent: z.boolean().nullish(),
    createdAt: z.union([z.number(), z.string()]),
    updatedAt: z.union([z.number(), z.string()]),
});
const AssignAgencySchema = z.object({
    responsesToEmail: z.array(ResponseSchema),
});
const AssignFlagSchema = z.object({
    responsesToUpdate: z.array(ResponseSchema),
});
router.route('/assign-agency').post(async (req, res) => {
    const logger = routeLogger('agencyAssignURL');
    const reqBody = AssignAgencySchema.parse(req.body);
    const {
        responsesToEmail: responseToAssignAgency,
    } = reqBody;
    for (const response of responseToAssignAgency) {
        try {
            await QuestionnaireResponse.updateOne({ _id: response._id }, response);
        }
        catch (err) {
            logger.error(err, 'updated agency err is');
        }
    }
    logger.info(reqBody, 'Successfully assigned agency');
    res.json({ msg: 'success' });
});

router.route('/assign-flag').post(async (req, res) => {
    const logger = routeLogger('assignResponseFlag');
    const reqBody = AssignFlagSchema.parse(req.body);
    const {
        responsesToUpdate,
    } = reqBody;
    for (const response of responsesToUpdate) {
        try {
            await QuestionnaireResponse.updateOne({ _id: response._id }, response);
        }
        catch (err) {
            logger.error(err, 'updated flag err is');
        }
    }
    logger.info(reqBody, 'Successfully assigned flag');
    res.json({ msg: 'success' });
});

router.route('/assign-email').post(async (req, res) => {
    const logger = routeLogger('assignEmail');
    const reqBody = AssignFlagSchema.parse(req.body);
    const {
        responsesToUpdate,
    } = reqBody;
    for (const response of responsesToUpdate) {
        try {
            await QuestionnaireResponse.updateOne(
                { _id: response._id },
                { ...response, emailSent: false });
        }
        catch (err) {
            logger.error(err, 'updated email to false err is');
        }
    }
    logger.info(reqBody, 'Successfully assigned email');
    res.json({ msg: 'success' });
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
