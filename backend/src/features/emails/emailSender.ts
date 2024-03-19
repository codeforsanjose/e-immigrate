export function getRequiredEmailSender() {
    const output = process.env.SENDER_EMAIL;
    if (output == null || output === '') throw new Error(`Missing the 'SENDER_EMAIL' environment variable`);
    return output;
}
export const emailSender = getRequiredEmailSender();