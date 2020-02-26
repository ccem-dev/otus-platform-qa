require('custom-env').env('staging');
const readline = require('readline-sync');
const fs = require('fs');

function write(path, content){
    fs.writeFile(path, content, function(err) {
        if(err) {
            throw err;
        }
    });
    console.log(`The file ${path} was saved!`);
}

function setDataByTerminalInput() {

    function readPlatformLoginData(){
        let email = readline.question(' Email (press Enter key to use default address): ');
        let password = '';
        if(email.length===0){
            email = process.env.DEFAULT_EMAIL;
            password = process.env.DEFAULT_PASSWORD;
        }
        else {
            password = readline.questionNewPassword(' Password: ', {
                min: 1,
                confirmMessage: ' Confirm password: ',
                unmatchMessage: '  It differs from first one. You can press Enter key to retry from first one.'
            });
        }
        return {
            email: email,
            password: password
        }
    }

    console.log("Set authentication data");
    const data = readPlatformLoginData();
    const content = JSON.stringify(data,null,4);
    write('.' + process.env.AUTHENTICATION_DATA_LOCAL_FILE_PATH, content);
    console.log('\nAuthentication data saved successfully.');
}

setDataByTerminalInput();