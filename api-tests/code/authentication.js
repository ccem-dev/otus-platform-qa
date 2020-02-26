const fs = require('fs');
require('custom-env').env('staging');

let EMAIL, PASSWORD;
let loaded = false;

function readData(){
    const data = JSON.parse(fs.readFileSync(process.cwd() + process.env.AUTHENTICATION_DATA_LOCAL_FILE_PATH));
    EMAIL = data.email;
    PASSWORD = data.password;
    loaded = true;
}

function getData(){
    if(!loaded){
        readData();
    }
    return {
        url: 'http://localhost:51002/otus-rest/v01/authentication',
        method: "POST",
        // header: {
        //     "Content-Type": "application/x-www-form-urlencoded",
        // },
        json: true,
        body: {
            email: EMAIL,
            password: PASSWORD
        }
    };
}

module.exports = {
    getData: getData
};
