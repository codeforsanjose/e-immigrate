import { workshopTitle } from "../data/LanguageOptions";
import { GetQuestionsByLanguageApiResponse } from "../types/ApiResults";
import { DEFAULT_LANGUAGE } from "../utilities/languages/constants";
import { apiUrlFormatters } from "./apiUrlFormatters";
import { sendRequest } from "./sendRequest";

type GetQuestionsByLanguageRequest = {
    title?: string;
    language?: string;
};
async function getQuestionsByLanguage(config: GetQuestionsByLanguageRequest) {
    const {
        title: userTitle = workshopTitle,
        language = DEFAULT_LANGUAGE,
    } = config;
    const title = (userTitle == null || userTitle === '') ? workshopTitle : userTitle;
    const requestObj = {
        url: apiUrlFormatters.getQuestionsByLanguage({
            title,
            language,
        }),
    };
    const response = await sendRequest<GetQuestionsByLanguageApiResponse>(requestObj);
    if (response == null) {
        console.error('response was null', {
            requestObj,
        });
        return;
    }
    return response;
}

export const api = {
    getQuestionsByLanguage,
};