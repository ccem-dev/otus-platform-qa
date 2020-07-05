const request = require('request-promise');
const authentication = require("../code/authentication");

let token;

async function setToken(){
    const data = await _sendRequest(authentication.getRequestData());
    token = data.token;
}

function hasToken(){
    return !!token;
}

async function sendRequestAndGetResponseData(url, method, body={}){
    const reqData = _mountRequestData(url, method, body);
    return await _sendRequest(reqData);
}

async function sendAPIRequestAndGetResponseData(url, method, body={}){
    const reqData = _mountRequestData(url, method, body, token);
    return await _sendRequest(reqData);
}

function _mountRequestData(url, method, body={}, token=undefined){
    return {
        url: url,
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": (token? "Bearer " + token : undefined)
        },
        json: true,
        body: body
    };
}

async function _sendRequest(reqData){
    let result = {};
    await request(reqData, function (error, response) {
        if(error) throw error;
        if(!response){
            result.error = new Error('Null/undefined response');
            return;
        }
        if(response.statusCode !== 200){
            result.error = new Error(`Status code ${response.statusCode}`);
            return;
        }
        result.data = response.body.data;
    });
    if(result.error){
        throw result.error;
    }
    return result.data;
}

module.exports = {
    setToken: setToken,
    hasToken: hasToken,
    sendAPIRequestAndGetResponseData: sendAPIRequestAndGetResponseData,
    sendRequestAndGetResponseData: sendRequestAndGetResponseData
};