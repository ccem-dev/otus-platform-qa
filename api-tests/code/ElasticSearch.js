const requestHelper = require("../code/requestHelper");

const ELASTICSEARCH_PORT = 9200;
const ELASTICSEARCH_URL_PREFIX = `http://localhost:${ELASTICSEARCH_PORT}`;

class ElasticSearch {

    static async getAllIssues(){
        const URL = ELASTICSEARCH_URL_PREFIX + '/_search?size=10000';
        let response = await requestHelper.sendRequestAndGetResponseData(URL, 'GET');
        return response.hits.hits;
    }

    static async createMessagesMapping(){
        const MESSAGES_URL = ELASTICSEARCH_URL_PREFIX + '/messages';
        const body = {
            "mappings": {
                "properties": {
                    "sender": { "type": "keyword" },
                    "text": { "type": "text" },
                    "creationDate": { "type": "date" },
                    "issueId":{"type":"keyword"}
                }
            }
        };
        try{
            await requestHelper.sendRequestAndGetResponseData(MESSAGES_URL, 'PUT', body);
            console.log("Messages mapping created");
        }
        catch (e) {
            console.error(e.message);
        }
    }

    static async createIssuesMapping(){
        const ISSUES_URL = ELASTICSEARCH_URL_PREFIX + '/issues';
        const body = {
            "mappings": {
                "properties": {
                    "objectType": { "type": "keyword" },
                    "sender": { "type": "keyword" },
                    "group": { "type": "keyword" },
                    "title": { "type": "text" },
                    "text": { "type": "text" },
                    "creationDate": { "type": "date" },
                    "status": { "type": "keyword" }
                }
            }
        };
        try{
            await requestHelper.sendRequestAndGetResponseData(ISSUES_URL, 'PUT', body);
            console.log("Issues mapping created");
        }
        catch (e) {
            console.log(e);
        }
    }

    static async deleteAllIssues(){
        try{
            await requestHelper.sendRequestAndGetResponseData(ELASTICSEARCH_URL_PREFIX + '/issues', 'DELETE');
            console.log("Issues deleted");
        }
        catch (e) {
            console.log(e);
        }
    }

    static async deleteAllMessages(){
        try{
            await requestHelper.sendRequestAndGetResponseData(ELASTICSEARCH_URL_PREFIX + '/messages', 'DELETE');
            console.log("Messages deleted");
        }
        catch (e) {
            console.log(e);
        }
    }

    static async deleteAllMessagesAndRecreateMapping(){
        await ElasticSearch.deleteAllMessages();
        await ElasticSearch.createMessagesMapping();
    }

    static async deleteAllIssuesAndRecreateMapping(){
        await ElasticSearch.deleteAllIssues();
        await ElasticSearch.createIssuesMapping();
    }
}

module.exports = ElasticSearch;