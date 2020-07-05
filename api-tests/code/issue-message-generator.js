const requestHelper = require("../code/requestHelper");
const ElasticSearch = require('../code/ElasticSearch');

const CS_PORT = 53004;
const CS_URL_PREFIX = `http://localhost:${CS_PORT}/api/project-communication`;

// get these constants from your database
const MY_USER_ID = '5d1bbabe995e20d290d94e49';
const CENTERS = {
    "RS" : "587d366a7b65e477dc410ab9",
    "BA" : "5864112d28f10d33b212feb0",
    "ES" : "5864112328f10d33b212feaf",
    "MG" : "5864111b28f10d33b212feae",
    "RJ" : "5864111228f10d33b212fead",
    "SP" : "5810e6127b65e413fd184c2a"
};

let participantIDs = {};

async function extractParticipantIDsFromEachCenter(numParticipants){
    await requestHelper.setToken();
    const URL = 'http://localhost:51002/otus-rest/v01/participants';
    let response = await requestHelper.sendAPIRequestAndGetResponseData(URL, 'GET');
    for(let center of Object.keys(CENTERS)){
        participantIDs[center] = response
            .filter(participant => participant.fieldCenter.acronym === center)
            .slice(0, numParticipants)
            .map(participant => {
                return participant._id
            });
    }
}

async function createOneIssueForEachParticipantOfCenters(){
    const URL = CS_URL_PREFIX + '/issues';
    let counter = 1;
    let issueIDs = [];

    for(let [center, centerID] of Object.entries(CENTERS)){
        let date = new Date("2020-01-01T15:30:00.000Z");

        for(let participantID of participantIDs[center]){
            let body = {
                "objectType": "Issue",
                "sender": participantID,
                "group": centerID,
                "title": `Participante ${counter} de ${center} nao consegue alguma coisa`,
                "text": `Texto da Issue do participante ${counter} de ${center} `,
                "creationDate": date.toISOString(),
                "status": "OPEN"
            };

            let response = await requestHelper.sendRequestAndGetResponseData(URL, 'POST', body);
            console.log(center, 'participant counter =', counter, participantID, 'response:', response);

            issueIDs.push(response);
            counter++;
            date.setDate(date.getDate() + 1);
        }
    }

    console.log(JSON.stringify(issueIDs, null, 4));
    return issueIDs;
}

async function createMessageForIssue(issueID, text, senderID, date){
    const URL = CS_URL_PREFIX + '/messages/' + issueID;
    const body = {
        "text": text,
        "sender": senderID,
        "creationDate": date.toISOString(),
        "issueId": issueID
    };
    let response = await requestHelper.sendRequestAndGetResponseData(URL, 'POST', body);
    console.log('Message created! id =', response);
}


(async function(){
    await ElasticSearch.deleteAllMessagesAndRecreateMapping();
    await ElasticSearch.deleteAllIssuesAndRecreateMapping();

    await extractParticipantIDsFromEachCenter(40);
    const issueIDs = await createOneIssueForEachParticipantOfCenters();

    const issueID = issueIDs[0];
    console.log("issueID", issueID);

    await createMessageForIssue(issueID, "text1", MY_USER_ID, new Date(2020,4,20));
    await createMessageForIssue(issueID, "text2", MY_USER_ID, new Date(2020,5,15));
})();