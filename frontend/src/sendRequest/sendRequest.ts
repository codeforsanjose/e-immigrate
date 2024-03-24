import { getAuthToken } from "../utilities/auth_utils";

const DEFAULT_HEADERS = {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
};

function getEffectiveHeaders(headers: HeadersInit | undefined | null, browser_gen_content_type: boolean) {
    const userHeaders = getHeadersOrDefault(headers);
    const actualHeaders = { ...DEFAULT_HEADERS, ...userHeaders };
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
function getHeadersOrDefault(headers: HeadersInit | undefined | null): HeadersInit {
    if (headers === null) return {};
    return headers ?? DEFAULT_HEADERS;
}
export async function fetchWrapper(
    requestObj: RequestObject,
    headers?: HeadersInit | undefined | null,
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

type SendRequestConfig = {
    includeAuth?: boolean;
    headers?: HeadersInit | undefined | null;
    browser_gen_content_type?: boolean;
};

;
function optionallyAttachAuthHeader(headers: HeadersInit, addAuth: boolean) {
    if (!addAuth) return headers;
    return {
        ...headers,
        Authorization: `Bearer ${getAuthToken()}`,
    };
}


export async function sendRequest<TResponse = unknown>(
    requestObj: RequestObject,
    config: SendRequestConfig = {},
): Promise<TResponse> {
    const {
        browser_gen_content_type = false,
        headers,
        includeAuth = false,
    } = config;
    
    const { url } = requestObj;
    const effectiveHeaders = optionallyAttachAuthHeader(getHeadersOrDefault(headers), includeAuth);
    const response = await fetchWrapper(requestObj, effectiveHeaders, browser_gen_content_type);
    // if (responseType === 'text') {
    //     return await response.text() as TResponse;
    // }
    // else if (responseType === 'blob') {
    //     return await response.blob() as TResponse;
    // }

    const raw = await response.text();

    try {
        return JSON.parse(raw);
    }
    catch (err) {
        console.error('ERROR!', {
            err,
            url,
            raw,
            data: response,
        });
        throw err;
    }
}