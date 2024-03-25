import sgMail, { MailDataRequired } from '@sendgrid/mail';
import dotenv from 'dotenv';
import { emailContents } from './emailContent.js';
import { emailSender } from '../../features/emails/emailSender.js';
dotenv.config();
function getRequiredSendGridApiKey() {
    const output = process.env.SENDGRID_API_KEY;
    if (output == null || output === '')  {
        throw new Error(`Missing env variable 'SENDGRID_API_KEY'`);
    }
    return output;
}
sgMail.setApiKey(getRequiredSendGridApiKey());
//todo: set senderEmail that has access to to e-immigrate SENDGRID_API_KEY key
export function sendEmail(email: string, name: string, flag: boolean, language: keyof typeof emailContents) {
    const colorFlag = flag ? 'red' : 'green';
    const emailContentForResponse = emailContents[language][colorFlag];
    const translatedContents = emailContentForResponse && emailContentForResponse === ''
        ? emailContents['en'][colorFlag]
        : emailContentForResponse;
    const msg = {
        to: email,
        from: emailSender,
        subject: 'Your Response has been received',
        html: translatedContents,
    };
    return sgMail.send(msg);
}
export function sendMassEmails(messages: Array<MailDataRequired>) {
    return sgMail.send(messages);
}

