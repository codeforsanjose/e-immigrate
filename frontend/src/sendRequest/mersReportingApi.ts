import { GetMERSQuestionsApiResponse } from "../types/ApiResults";
import { apiUrls } from "./apiUrls";
import { sendRequest } from "./sendRequest";

type GetMERSQuestionsRequest = {
    title?: string;
};
async function getMersReportingQuestions(config: GetMERSQuestionsRequest) {
    const requestObj = {
        url: apiUrls.getAllMersReportingResponses,
    };
    const response = await sendRequest<GetMERSQuestionsApiResponse>(requestObj);
    if (response == null) {
        console.error('response was null', {
            requestObj,
        });
        return;
    }
    return response;
}

export const api = {
    getMersReportingQuestions,
};