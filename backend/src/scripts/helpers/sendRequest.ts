type SendRequestObj = {
    url: string;
    method: string;
    body: string;
};

const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
};

export async function sendRequest(requestObj: SendRequestObj, headers = DEFAULT_HEADERS) {
    const {
        url,
        ...rest
    } = requestObj;

    try {
        const data = await fetch(url, { ...rest, headers });
        return await data.json();
    }
    catch (error) {
        console.error('uploading failed due to error', error);
    }
}