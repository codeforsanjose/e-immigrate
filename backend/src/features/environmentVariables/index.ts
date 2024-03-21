type EnvironmentVariableConfig = {
    allowEmpty?: boolean;
}

export function getRequiredEnvironmentVariable(name: string, config: EnvironmentVariableConfig = {}) {
    const {
        allowEmpty = false,
    } = config;
    const output = process.env[name];
    if ((output == null) || (output === '' && !allowEmpty)) throw new Error(`Missing the '${name}' environment variable`);
    return output;
}