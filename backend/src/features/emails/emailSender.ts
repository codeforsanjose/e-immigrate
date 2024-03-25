import { getRequiredEnvironmentVariable } from "../environmentVariables/index.js";


/**
 *   The email address to send messages from.
 * @todo set senderEmail that has access to to e-immigrate SENDGRID_API_KEY key
 */
export const emailSender = getRequiredEnvironmentVariable('SENDER_EMAIL');