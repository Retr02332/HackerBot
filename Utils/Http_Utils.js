const text = require('../Text/Text.js');
const fetch = require('node-fetch');
const Headers = fetch.Headers;
const btoa = require('btoa');

const buildHeader = (h1_user, h1_token) => {
    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(h1_user + ":" + h1_token));
    headers.set('Accept', 'application/json');
    return headers;
}

const requestToApi = (endpoint, h1_user, h1_token, parser) => {
    return fetch(endpoint, {
        method:"GET",
        headers: buildHeader(h1_user, h1_token)
    })

    .then(response => response.json())
    .then(body => parser(body))
    .catch(error => `An error occurred during the request => ${text.error}`)
}

exports.requestToApi = requestToApi
