const requestHelper = require("../code/requestHelper");

let token;

beforeAll(async() => {
    token = await requestHelper.getToken();
    expect(token).not.toBeNull();
    expect(token.length).toBeGreaterThan(0);
});

//*************************************************
// Specific constants, variables and functions

const URL = 'http://localhost:51002/otus-rest/v01/pendency/user-activity-pendency/list';

function checkPendencyList(pendencyList, expectedIds){
    expect(pendencyList).not.toBeNull();
    expect(pendencyList).toBeArrayOfSize(expectedIds.length);

    let i=0;
    for(let pendency of pendencyList){
        expect(pendency._id).toBe(expectedIds[i++]);
    }
}

//*************************************************
// Tests

describe('Suite 1', () => {

    const currentQuantity = 4;
    const quantityToGet = 10;

    function getFilterRequestFixedData() {
        const reqData = requestHelper.getRequestFixedData(token, URL, "POST");
        reqData.body = {
            "currentQuantity": currentQuantity,
            "quantityToGet": quantityToGet,
            "filter": {}
        };
        return reqData;
    }

    test('Get pendencies filtered by receiver', async () => {
        var expectedIds = [
            "5e4d3efeb21d193f35c87b40",
            "5e4d3efeb21d193f35c87b41",
            "5e4d3efeb21d193f35c87b42",
            "5e4d3efeb21d193f35c87b43",
            "5e4d3efeb21d193f35c87b44",
            "5e4d3efeb21d193f35c87b45",
            "5e4d3efeb21d193f35c87b46",
            "5e4d3efeb21d193f35c87b47",
            "5e4d3efeb21d193f35c87b48",
            "5e4d3efeb21d193f35c87b49"
        ];

        const receiver = "flavia.avila@ufrgs.br";
        const reqData = getFilterRequestFixedData(token, URL);
        reqData.body.filter = {
            "receiver": [receiver]
        };
        const pendencyList = await requestHelper.sendRequestAndGetData(reqData);
        //console.log(pendencyList);
        checkPendencyList(pendencyList, expectedIds);
        for (let pendency of pendencyList) {
            expect(pendency.receiver).toBe(receiver);
        }
    });

    test('Get pendencies filtered by requester', async () => {
        var expectedIds = [
            "5e4d3efeb21d193f35c87b40",
            "5e4d3efeb21d193f35c87b41",
            "5e4d3efeb21d193f35c87b42",
            "5e4d3efeb21d193f35c87b43",
            "5e4d3efeb21d193f35c87b44",
            "5e4d3efeb21d193f35c87b45",
            "5e4d3efeb21d193f35c87b46",
            "5e4d3efeb21d193f35c87b47",
            "5e4d3efeb21d193f35c87b48",
            "5e4d3efeb21d193f35c87b49"
        ];

        const requester = "CREATED@otus.com";
        const reqData = getFilterRequestFixedData(token, URL);
        reqData.body.filter = {
            "requester": [requester]
        };

        const pendencyList = await requestHelper.sendRequestAndGetData(reqData);
        //console.log(pendencyList);
        checkPendencyList(pendencyList, expectedIds);
        for (let pendency of pendencyList) {
            expect(pendency.requester).toBe(requester);
        }
    });

});
