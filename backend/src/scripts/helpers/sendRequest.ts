import { scopedLogger } from "../../features/logging/logger.js";

type SendRequestObj = {
    url: string;
    method: string;
    body: string;
};

const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
    Authorization: '',
};
const logger = scopedLogger('sendRequest');
export async function sendRequest(requestObj: SendRequestObj, headers = DEFAULT_HEADERS) {
    const {
        url,
        ...rest
    } = requestObj;

    try {
        const data = await fetch(url, { ...rest, headers });
        if (!data.ok) {
            logger.error({
                data,
                raw: await data.text(),
            }, 'Return code was not successful!');
            return;
        }
    }
    catch (error) {
        logger.error(error, 'request failed');
    }
}