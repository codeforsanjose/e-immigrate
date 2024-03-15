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
}
export async function sendRequest<TResponse = unknown>(
    requestObj: RequestObject,
    headers: HeadersInit = DEFAULT_HEADERS,
    browser_gen_content_type = false
): Promise<TResponse> {
    const {
        url,
        ...rest
    } = requestObj;
    const actualHeaders = getEffectiveHeaders(headers, browser_gen_content_type);
    const data = await fetch(url, {
        ...requestObj,
        headers: actualHeaders,
    });
    return await data.json();
}

