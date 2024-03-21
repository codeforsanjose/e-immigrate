import sgMail, { MailDataRequired } from '@sendgrid/mail';
import dotenv from 'dotenv';
import { emailContents } from "./emailContents.js";
import { emailSender } from './emailSender.js';
import { getRequiredEnvironmentVariable } from '../environmentVariables/index.js';
dotenv.config();
sgMail.setApiKey(getRequiredEnvironmentVariable('SENDGRID_API_KEY'));
// todo: set senderEmail that has access to to e-immigrate SENDGRID_API_KEY key
export async function sendEmail(email: string, name: string, flag: boolean, language: keyof typeof emailContents) {
    const colorFlag = flag ? 'red' : 'green';
    const emailContentForResponse = emailContents[language][colorFlag];
    const translatedContents = emailContentForResponse && emailContentForResponse === ''
        ? emailContents.en[colorFlag]
        : emailContentForResponse;
    const msg = {
        to: email,
        from: emailSender,
        subject: 'Your Response has been received',
        html: translatedContents,
    };
    return await sgMail.send(msg);
}
export async function sendMassEmails(messages: Array<MailDataRequired>) {
    return await sgMail.send(messages);
}
