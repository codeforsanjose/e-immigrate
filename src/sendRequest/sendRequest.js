const DEFAULT_HEADERS = {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
};

const sendRequest = (requestObj, headers = DEFAULT_HEADERS) => {
    const url = requestObj.url;
    delete requestObj.url;
    const response = fetch(url, { ...requestObj, ...headers }).then((data) =>
        data.json()
    );

    return Promise.resolve(response);
};

export { sendRequest };
