import sgMail, { MailDataRequired } from '@sendgrid/mail';
import dotenv from 'dotenv';
import { emailContents } from "./emailContents.js";
import { emailSender } from './emailSender.js';
import { getRequiredEnvironmentVariable } from '../environmentVariables/index.js';
import { EmailContentLanguages } from './emailContentLanguages.js';
import { DEFAULT_LANGUAGE } from '../languages/default.js';
import { EmailContent } from './types.js';
import { scopedLogger } from '../logging/logger.js';
dotenv.config();
sgMail.setApiKey(getRequiredEnvironmentVariable('SENDGRID_API_KEY'));

const logger = scopedLogger('email');
function getColoredLanguage(content: EmailContent, flag: boolean) {
    return flag ? content.red : content.green;
}
function getEmailContentForLanguage(language: EmailContentLanguages, flag: boolean) {
    const translatedContent = getColoredLanguage(emailContents[language], flag);
    if (translatedContent == null || translatedContent === '') {
        const fallbackContent = getColoredLanguage(emailContents[DEFAULT_LANGUAGE], flag);
        if (fallbackContent == null || fallbackContent === '') {
            logger.error({
                language,
                fallback: DEFAULT_LANGUAGE,
                flag,
            }, `Failed to find the fallback email content`);
            throw new Error('Failed to find the fallback email content');
        }
        return fallbackContent;
    }
    return translatedContent;
}
export async function sendEmail(email: string, name: string, flag: boolean, language: EmailContentLanguages) {
    const msg = {
        to: email,
        from: emailSender,
        subject: 'Your Response has been received',
        html: getEmailContentForLanguage(language, flag),
    };
    return await sgMail.send(msg);
}
export async function sendMassEmails(messages: Array<MailDataRequired>) {
    return await sgMail.send(messages);
}
