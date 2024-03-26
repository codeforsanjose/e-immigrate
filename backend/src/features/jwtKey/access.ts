import { getRequiredEnvironmentVariable } from "../environmentVariables/index.js";

export function getRequiredJwtKey() {
    return getRequiredEnvironmentVariable('JWT_KEY');
}