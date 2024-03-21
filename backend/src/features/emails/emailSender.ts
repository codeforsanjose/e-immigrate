import { getRequiredEnvironmentVariable } from "../environmentVariables/index.js";

export const emailSender = getRequiredEnvironmentVariable('SENDER_EMAIL');