const fs = require('fs');
require('custom-env').env('staging');

let EMAIL, PASSWORD;
let loaded = false;

function _readData(){
    const data = JSON.parse(fs.readFileSync(process.cwd() + process.env.AUTHENTICATION_DATA_LOCAL_FILE_PATH));
    EMAIL = data.email;
    PASSWORD = data.password;
    loaded = true;
}

function getRequestData(){
    if(!loaded){
        _readData();
    }
    return {
        url: 'http://localhost:51002/otus-rest/v01/authentication',
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        json: true,
        body: {
            email: EMAIL,
            password: PASSWORD
        }
    };
}

module.exports = {
    getRequestData: getRequestData
};
