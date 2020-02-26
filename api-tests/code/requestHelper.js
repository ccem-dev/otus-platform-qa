const request = require('request-promise');
const authentication = require("../code/authentication");

async function sendRequestAndGetData(reqData){
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
    const data = await sendRequestAndGetData(authentication.getData());
    return data.token;
}

function getRequestFixedData(token, url, method){
    return {
        url: url,
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        json: true,
        body: {}
    };
}

module.exports = {
    sendRequestAndGetData: sendRequestAndGetData,
    getToken: getToken,
    getRequestFixedData: getRequestFixedData
};