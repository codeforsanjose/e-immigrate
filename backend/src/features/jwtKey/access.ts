export function getRequiredJwtKey() {
    const output = process.env.JWT_KEY;
    if (output == null || output === '') {
        throw new Error(`Missing the 'JWT_KEY' env variable`);
    }
    return output;
}