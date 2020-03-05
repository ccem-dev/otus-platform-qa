const request = require('request-promise');
const authentication = require("../code/authentication");

async function sendRequestAndGetResponseData(reqData){
    let result = {};
    await request(reqData, function (error, response) {
        if(error) throw error;
        if(!response){
            throw 'Null/undefined response';
        }
        if(response.statusCode !== 200){
            throw `Status code ${response.statusCode}`;
        }
        result['value'] = response.body.data;
    });
    return result.value;
}

async function getToken(){
    const data = await sendRequestAndGetResponseData(authentication.getData());
    return data.token;
}

function mountRequestData(token, url, method, body={}){
    return {
        url: url,
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        json: true,
        body: body
    };
}

module.exports = {
    sendRequestAndGetResponseData: sendRequestAndGetResponseData,
    getToken: getToken,
    mountRequestData: mountRequestData
};