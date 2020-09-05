const fetch = require('node-fetch');

const sendRequest = (requestObj) => {
    let url = requestObj.url;
    delete requestObj.url;
    let response = fetch(url, requestObj).then((data) => data.json());
    return Promise.resolve(response);
};

module.exports = { sendRequest };
