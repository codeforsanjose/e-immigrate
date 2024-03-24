const DEFAULT_HEADERS = {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
};

function getEffectiveHeaders(headers: HeadersInit, browser_gen_content_type: boolean) {
    const actualHeaders = { ...DEFAULT_HEADERS, ...headers };
    if (browser_gen_content_type) {
        const {
            "Content-Type": contentTypeHeaders,
            ...rest
        } = actualHeaders;
        return rest;
    }
    return actualHeaders;
}
type RequestObject = RequestInit & {
    url: URL | RequestInfo;
};
export async function fetchWrapper(
    requestObj: RequestObject,
    headers: HeadersInit = DEFAULT_HEADERS,
    browser_gen_content_type = false,
) {
    const {
        url,
        ...rest
    } = requestObj;
    const actualHeaders = getEffectiveHeaders(headers, browser_gen_content_type);
    const data = await fetch(url, {
        ...rest,
        headers: actualHeaders,
    });
    return data;
}
export async function sendRequest<TResponse = unknown>(
    requestObj: RequestObject,
    headers: HeadersInit = DEFAULT_HEADERS,
    browser_gen_content_type = false,
): Promise<TResponse> {
    const {
        url,
    } = requestObj;
    const data = await fetchWrapper(requestObj, headers, browser_gen_content_type);
    // const actualHeaders = getEffectiveHeaders(headers, browser_gen_content_type);
    // const data = await fetch(url, {
    //     ...rest,
    //     headers: actualHeaders,
    // });
    const raw = await data.text();
    try {
        return JSON.parse(raw);
    }
    catch (err) {
        console.error('ERROR!', {
            err,
            url,
            raw,
            data,
        });
        throw err;
    }
}
