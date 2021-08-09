const DEFAULT_HEADERS = {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
};

const sendRequest = (
    requestObj,
    headers = DEFAULT_HEADERS,
    browser_gen_content_type = false
) => {
    const url = requestObj.url;
    delete requestObj.url;
    headers = { ...DEFAULT_HEADERS, ...headers };
    if (browser_gen_content_type) {
        delete headers['Content-Type'];
    }
    return fetch(url, {
        ...requestObj,
        headers: headers,
    }).then((data) => data.json());
};

export { sendRequest };
