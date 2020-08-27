const fetch = require('node-fetch')

async function sendRequest(url, reqObj) {
    let response = await fetch(url, reqObj);
    return await response.json();
}

module.exports = { sendRequest };