const sgMail = require('@sendgrid/mail');
require('dotenv').config();
const emailContents = require('./emailContent.js');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//todo: set senderEmail that has access to to e-immigrate SENDGRID_API_KEY key

const senderEmail = process.env.SENDER_EMAIL;
const sendEmail = (email, name, flag, language) => {
    const colorFlag = flag ? 'red' : 'green';
    const emailContentForResponse = emailContents[language][colorFlag];
    const translatedContents =
        emailContentForResponse === ''
            ? emailContents['en'][colorFlag]
            : emailContentForResponse;
    const msg = {
        to: email,
        from: senderEmail,
        subject: 'Your Response has been received',
        html: translatedContents,
    };
    return sgMail.send(msg);
};

module.exports = sendEmail;
