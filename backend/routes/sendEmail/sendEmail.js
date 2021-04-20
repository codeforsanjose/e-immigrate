const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//todo: set senderEmail that has access to to e-immigrate SENDGRID_API_KEY key

const senderEmail = '';
const sendEmail = ({ userEmail, userEnteredName, flag }) => {
    const msg = {
        to: userEmail,
        from: senderEmail,
        subject: 'Your Response has been received',
        html: `Hello ${userEnteredName}, <br /> This is a confirmation that your response to eimmigrate questionnaire has been received. Thank you!`,
    };
    sgMail.send(msg);
};

module.exports = sendEmail;
