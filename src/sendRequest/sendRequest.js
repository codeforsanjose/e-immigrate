const DEFAULT_HEADERS = {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
};

const sendRequest = (requestObj, headers = DEFAULT_HEADERS) => {
    const url = requestObj.url;
    delete requestObj.url;
    return fetch(url, {
        ...requestObj,
        headers: { ...headers },
    }).then((data) => data.json());
};

export { sendRequest };
