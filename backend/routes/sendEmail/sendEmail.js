const sgMail = require('@sendgrid/mail');
require('dotenv').config();
const emailContents = require('./emailContent.js');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const senderEmail = process.env.SENDER_EMAIL;
//todo: set senderEmail that has access to to e-immigrate SENDGRID_API_KEY key

const sendEmail = (
    email,
    name,
    flag,
    language,
    sessionTime = 'Please contact (510) 944-9595 for details'
) => {
    const colorFlag = 'green';
    const emailContentForResponse =
        emailContents[language][colorFlag](sessionTime);
    const translatedContents =
        emailContentForResponse && emailContentForResponse === ''
            ? emailContents['en'][colorFlag](sessionTime)
            : emailContentForResponse;
    const msg = {
        to: email,
        from: senderEmail,
        subject: 'Your Response has been received',
        html: translatedContents,
    };
    console.log('MESSAGE SENDING -----> ', msg);
    return sgMail.send(msg);
};
const sendMassEmails = (messages) => {
    console.log('MESSAGE SENDING -----> ', messages.length);
    return sgMail.send(messages);
};

module.exports = sendEmail;
module.exports = sendMassEmails;
