const requestHelper = require("../code/requestHelper");

let token;

beforeAll(async() => {
    token = await requestHelper.getToken();
    expect(token).not.toBeNull();
    expect(token.length).toBeGreaterThan(0);
});

//*************************************************
// Specific constants, variables and functions

const URL = 'http://localhost:51002/otus-rest/v01/participant/participant-contact/';
const OBJECT_TYPE = 'ParticipantContact';

const CONTACT_TYPES = {
    EMAIL: "email",
    ADDRESS: "address",
    PHONE: "phoneNumber"
};
const INVALID_TYPE = "invalid";

const URL_SUFFIX = {
    EMAIL: "email",
    ADDRESS: "address",
    PHONE: "phone-number"
};

const POSITIONS = {
    MAIN: "main",
    SECOND: "second",
    THIRD: "third",
    FOURTH: "fourth",
    FIFTH: "fifth"
};
const INVALID_POSITION = "invalid";

const data = {
    email: [ null,
        mountNewEmailOrPhone("main@gmail", "personal"),
        mountNewEmailOrPhone("second@gmail", "second email"),
        mountNewEmailOrPhone("third@gmail", "email 3"),
        mountNewEmailOrPhone("fourth@gmail"),
        mountNewEmailOrPhone("fifth@gmail"),
        mountNewEmailOrPhone("new@gmail", 'other email')
    ],
    address: [ null,
        mountNewAddress("Rua 1", 1, "CASA 11",
            "One", "Cidade 1", "RS", "Brasil", "91111-111",
            "casa"),

        mountNewAddress("Av 2", 2, "somewhere over the rainbow",
            "Zona Sul", "Canela", "RS", "Brasil", "92222-222",
            "casa da vizinha da minha tia."),

        mountNewAddress("Rua 3", 3, "apto 333",
            "Three", "Cidade 3", "SC", "Brasil", "93333-333",
            "casa da mae"),

        mountNewAddress("Rua 4", 44, "casa 444",
            "Four", "Cidade 4", "RS", "Brasil", "94444-444",
            "trabalho"),

        mountNewAddress("Av 5", 5, "ap 555",
            "Five", "Cidade 5", "RS", "Brasil", "95555-555",
            "trabalho do irmao"),

        mountNewAddress("Rua dos Bobos", 0, "Feita com muito esmero!",
            "Centro", "Porto Alegre", "RS", "Brasil", "90010-907",
            "casa nova")
    ],
    phoneNumber: [ null,
        mountNewEmailOrPhone("1111111111", "casa"),
        mountNewEmailOrPhone("2222222222", "celular 1"),
        mountNewEmailOrPhone("3333333333", "trabalho"),
        mountNewEmailOrPhone("44444444", "celular 2"),
        mountNewEmailOrPhone("5555555555"),
        mountNewEmailOrPhone("51999999999", 'novo')
    ]
};

const RN = 12345;

let participantContact = null,
    participantContactId = null;

function mountNewEmailOrPhone(emailOrPhoneNumber, observation=undefined){
    return {
        "value": { "content": emailOrPhoneNumber },
        "observation": observation
    }
}

function mountNewAddress(street, streetNumber, complements, neighbourhood, city, state, country,
                         postalCode=undefined, observation=undefined){
    return {
        "value": {
            "postalCode": postalCode,
            "street": street,
            "streetNumber": streetNumber,
            "complements": complements,
            "neighbourhood": neighbourhood,
            "city": city,
            "state": state,
            "country": country
        },
        "observation": observation
    }
}

function mountDto(participantContactId, position, contactItem, type=undefined){
    return{
        _id: participantContactId,
        position: position,
        contactItem: contactItem,
        type: type
    }
}

function mountContact(numEmails, numAddresses, numPhoneNumbers){

    if(numEmails < 1 || numEmails > 5 ||
        numAddresses < 1 || numAddresses > 5 ||
        numPhoneNumbers < 1 || numPhoneNumbers > 5){
        throw 'Some contact quantity is out of range [1, 5]';
    }

    let participantContact = {
        objectType: OBJECT_TYPE,
        recruitmentNumber: RN
    };

    const quantities = {};
    quantities[CONTACT_TYPES.EMAIL] = numEmails;
    quantities[CONTACT_TYPES.ADDRESS] = numAddresses;
    quantities[CONTACT_TYPES.PHONE] = numPhoneNumbers;

    const positions = ([null]).concat(Object.values(POSITIONS));

    for(let type of Object.values(CONTACT_TYPES)){
        participantContact[type] = {};
        for (let i = 1; i <= quantities[type]; i++) {
            participantContact[type][positions[i]] = data[type][i];
        }
    }

    return participantContact;
}

async function createParticipantContact(numEmails, numAddresses, numPhoneNumbers){
    participantContact = mountContact(numEmails, numAddresses, numPhoneNumbers);
    const reqData = requestHelper.mountRequestData(token, URL, "POST", participantContact);
    const createdParticipantContactId = await requestHelper.sendRequestAndGetResponseData(reqData);
    expect(createdParticipantContactId).toBeString();
    console.log("Participant contact CREATED: _id = " + createdParticipantContactId);
    return createdParticipantContactId;
}

async function deleteParticipantContact(participantContactId){
    const reqData = requestHelper.mountRequestData(token, URL+participantContactId, "DELETE");
    const response = await requestHelper.sendRequestAndGetResponseData(reqData);
    expect(response).toBeTrue();
    console.log("Participant contact DELETED: _id = " + participantContactId);
}

async function requestParticipantContact(){
    const reqData = requestHelper.mountRequestData(token, URL+participantContactId, "GET");
    return await requestHelper.sendRequestAndGetResponseData(reqData);
}

function checkValue(gettedParticipantContact, expectedParticipantContact, contactType, position){
    const expectedValue = expectedParticipantContact[contactType][position];
    const receivedValue = gettedParticipantContact[contactType][position];
    try{
        expect(receivedValue).toEqual(expectedValue);
    }
    catch (e) {
        console.error(`${contactType}.${position}: expected ${expectedValue} but received ${receivedValue}`);
        throw e;
    }
}

async function checkResultWithGetMethod(expectedParticipantContact, contactType, positionsToCheck){
    // assuming that get method works correctly
    let fail = false;
    const gettedParticipantContact = await requestParticipantContact();
    for(let position of positionsToCheck){
        try{
            checkValue(gettedParticipantContact, expectedParticipantContact, contactType, position);
        }
        catch (e) {
            fail = true;
        }
    }
    if(fail){
        expect(false).toBeTrue();
    }
    return gettedParticipantContact;
}

async function sendRequestAndExpectError(func, urlSuffix, contactType, position){
    //expect(async() => await addNonMainContactAtEnd(urlSuffix, contactType, position)).toThrowError();
    try {
        await func(urlSuffix, contactType, position);
        expect(false).toBeTrue();
    }
    catch (e) {
        expect(true).toBeTrue();
    }
}

//*************************************************
// Tests

describe('Create and DeleteById Methods Suite', () => {

    let participantContactId = undefined;
    
    test("Create Method Test", async() => {
        participantContactId = await createParticipantContact(1,1,1);
    });

    test("Delete Method Test", async() => {
        if(participantContactId) {
            await deleteParticipantContact(participantContactId);
        }
    });
});

describe('Get Methods Suite', () => {

    beforeEach(async() => {
        participantContactId = await createParticipantContact(1,1,1);
    });

    afterEach(async() => {
        if(participantContactId) {
            await deleteParticipantContact(participantContactId);
            participantContactId = undefined;
        }
    });

    test("Get by ID Method Test", async() => {
        const gettedParticipantContact = await requestParticipantContact();
        expect(gettedParticipantContact).not.toBeNull();
        checkValue(gettedParticipantContact, participantContact, CONTACT_TYPES.EMAIL, POSITIONS.MAIN);
    });

    test("Get by RN Method", async() => {
        const reqData = requestHelper.mountRequestData(token, URL+"rn/"+RN, "GET");
        const gettedParticipantContact = await requestHelper.sendRequestAndGetResponseData(reqData);
        expect(gettedParticipantContact).not.toBeNull();
        checkValue(gettedParticipantContact, participantContact, CONTACT_TYPES.EMAIL, POSITIONS.MAIN);
    });
});

describe("Edition Methods Suite", () => {

    afterEach(async() => {
        if(participantContactId) {
            await deleteParticipantContact(participantContactId);
            participantContactId = undefined;
        }
    });

    describe('Update Contact Method Suite', () => {

        async function updateMainContact(urlSuffix, contactType, position){
            participantContactId = await createParticipantContact(5,5,5);
            const participantContactItem = data[contactType][6];

            const reqData = requestHelper.mountRequestData(token, URL+"update/"+urlSuffix, "PUT",
                mountDto(participantContactId, position, participantContactItem));
            const response = await requestHelper.sendRequestAndGetResponseData(reqData);
            expect(response).toBeTrue();

            const prevArraySize = Object.keys(participantContact[contactType]).length;
            const positions = Object.values(POSITIONS).slice(0, prevArraySize+1);

            const participantContactCopy = Object.assign({}, participantContact);
            participantContactCopy[contactType][position] = participantContactItem;
            await checkResultWithGetMethod(participantContactCopy, contactType, positions);
        }

        test("Update Main EMAIL", async() => {
            await updateMainContact(URL_SUFFIX.EMAIL, CONTACT_TYPES.EMAIL, POSITIONS.MAIN);
        });

        test("Update Main PHONE", async() => {
            await updateMainContact(URL_SUFFIX.PHONE, CONTACT_TYPES.PHONE, POSITIONS.MAIN);
        });

        test("Update Main ADDRESS", async() => {
            await updateMainContact(URL_SUFFIX.ADDRESS, CONTACT_TYPES.ADDRESS, POSITIONS.MAIN);
        });


        test("Update Second EMAIL", async() => {
            await updateMainContact(URL_SUFFIX.EMAIL, CONTACT_TYPES.EMAIL, POSITIONS.SECOND);
        });

        test("Update Second PHONE", async() => {
            await updateMainContact(URL_SUFFIX.PHONE, CONTACT_TYPES.PHONE, POSITIONS.SECOND);
        });

        test("Update Second ADDRESS", async() => {
            await updateMainContact(URL_SUFFIX.ADDRESS, CONTACT_TYPES.ADDRESS, POSITIONS.SECOND);
        });


        test("Update Third EMAIL", async() => {
            await updateMainContact(URL_SUFFIX.EMAIL, CONTACT_TYPES.EMAIL, POSITIONS.THIRD);
        });

        test("Update Third PHONE", async() => {
            await updateMainContact(URL_SUFFIX.PHONE, CONTACT_TYPES.PHONE, POSITIONS.THIRD);
        });

        test("Update Third ADDRESS", async() => {
            await updateMainContact(URL_SUFFIX.ADDRESS, CONTACT_TYPES.ADDRESS, POSITIONS.THIRD);
        });


        test("Update Fourth EMAIL", async() => {
            await updateMainContact(URL_SUFFIX.EMAIL, CONTACT_TYPES.EMAIL, POSITIONS.FOURTH);
        });

        test("Update Fourth PHONE", async() => {
            await updateMainContact(URL_SUFFIX.PHONE, CONTACT_TYPES.PHONE, POSITIONS.FOURTH);
        });

        test("Update Fourth ADDRESS", async() => {
            await updateMainContact(URL_SUFFIX.ADDRESS, CONTACT_TYPES.ADDRESS, POSITIONS.FOURTH);
        });


        test("Update Fifth EMAIL", async() => {
            await updateMainContact(URL_SUFFIX.EMAIL, CONTACT_TYPES.EMAIL, POSITIONS.FIFTH);
        });

        test("Update Fifth PHONE", async() => {
            await updateMainContact(URL_SUFFIX.PHONE, CONTACT_TYPES.PHONE, POSITIONS.FIFTH);
        });

        test("Update Fifth ADDRESS", async() => {
            await updateMainContact(URL_SUFFIX.ADDRESS, CONTACT_TYPES.ADDRESS, POSITIONS.FIFTH);
        });


        test("Update EMAIL with invalid type should throw error", async() => {
            await sendRequestAndExpectError(updateMainContact, URL_SUFFIX.EMAIL, INVALID_TYPE, POSITIONS.SECOND);
        });

        test("Update ADDRESS with invalid type should throw error", async() => {
            await sendRequestAndExpectError(updateMainContact, URL_SUFFIX.ADDRESS, INVALID_TYPE, POSITIONS.SECOND);
        });

        test("Update PHONE with invalid type should throw error", async() => {
            await sendRequestAndExpectError(updateMainContact, URL_SUFFIX.PHONE, INVALID_TYPE, POSITIONS.SECOND);
        });


        test("Update EMAIL with invalid position should throw error", async() => {
            await sendRequestAndExpectError(updateMainContact, URL_SUFFIX.EMAIL, CONTACT_TYPES.EMAIL, INVALID_POSITION);
        });

        test("Update ADDRESS with invalid position should throw error", async() => {
            await sendRequestAndExpectError(updateMainContact, URL_SUFFIX.ADDRESS, CONTACT_TYPES.ADDRESS, INVALID_POSITION);
        });

        test("Update PHONE with invalid position should throw error", async() => {
            await sendRequestAndExpectError(updateMainContact, URL_SUFFIX.PHONE, CONTACT_TYPES.PHONE, INVALID_POSITION);
        });

    });

    describe('Add Non Main Contact Method Suite', () => {

        async function addNonMainContactAtEnd(urlSuffix, contactType, position){
            const numContacts = Object.values(POSITIONS).indexOf(position);
            if(!participantContactId){
                participantContactId = await createParticipantContact(numContacts, numContacts, numContacts);
            }
            const participantContactItem = data[contactType][numContacts+1];

            const prevArraySize = Object.keys(participantContact[contactType]).length;
            const reqData = requestHelper.mountRequestData(token, URL+"add-non-main/"+urlSuffix, "PUT",
                mountDto(participantContactId, position, participantContactItem));

            const response = await requestHelper.sendRequestAndGetResponseData(reqData);
            expect(response).toBeTrue();
            // console.log(JSON.stringify(response, null, 2));//.

            const participantContactCopy = Object.assign({}, participantContact);
            participantContactCopy[contactType][position] = participantContactItem;
            const positions = Object.values(POSITIONS).slice(0, prevArraySize+1);
            const gettedParticipantContact = await checkResultWithGetMethod(participantContactCopy, contactType, positions);
            expect(Object.keys(gettedParticipantContact[contactType])).toBeArrayOfSize(prevArraySize+1);
        }

        test("Add MAIN EMAIL", async() => {
            await sendRequestAndExpectError(addNonMainContactAtEnd, URL_SUFFIX.EMAIL, CONTACT_TYPES.EMAIL, POSITIONS.MAIN);
        });

        test("Add MAIN PHONE", async() => {
            await sendRequestAndExpectError(addNonMainContactAtEnd, URL_SUFFIX.PHONE, CONTACT_TYPES.PHONE, POSITIONS.MAIN);
        });

        test("Add MAIN ADDRESS", async() => {
            await sendRequestAndExpectError(addNonMainContactAtEnd, URL_SUFFIX.ADDRESS, CONTACT_TYPES.ADDRESS, POSITIONS.MAIN);
        });


        test("Add SECOND EMAIL", async() => {
            await addNonMainContactAtEnd(URL_SUFFIX.EMAIL, CONTACT_TYPES.EMAIL, POSITIONS.SECOND);
        });

        test("Add SECOND PHONE", async() => {
            await addNonMainContactAtEnd(URL_SUFFIX.PHONE, CONTACT_TYPES.PHONE, POSITIONS.SECOND);
        });

        test("Add SECOND ADDRESS", async() => {
            await addNonMainContactAtEnd(URL_SUFFIX.ADDRESS, CONTACT_TYPES.ADDRESS, POSITIONS.SECOND);
        });


        test("Add THIRD EMAIL", async() => {
            await addNonMainContactAtEnd(URL_SUFFIX.EMAIL, CONTACT_TYPES.EMAIL, POSITIONS.THIRD);
        });

        test("Add THIRD PHONE", async() => {
            await addNonMainContactAtEnd(URL_SUFFIX.PHONE, CONTACT_TYPES.PHONE, POSITIONS.THIRD);
        });

        test("Add THIRD ADDRESS", async() => {
            await addNonMainContactAtEnd(URL_SUFFIX.ADDRESS, CONTACT_TYPES.ADDRESS, POSITIONS.THIRD);
        });


        test("Add FOURTH EMAIL", async() => {
            await addNonMainContactAtEnd(URL_SUFFIX.EMAIL, CONTACT_TYPES.EMAIL, POSITIONS.FOURTH);
        });

        test("Add FOURTH PHONE", async() => {
            await addNonMainContactAtEnd(URL_SUFFIX.PHONE, CONTACT_TYPES.PHONE, POSITIONS.FOURTH);
        });

        test("Add FOURTH ADDRESS", async() => {
            await addNonMainContactAtEnd(URL_SUFFIX.ADDRESS, CONTACT_TYPES.ADDRESS, POSITIONS.FOURTH);
        });

        test("Add FIFTH EMAIL", async() => {
            await addNonMainContactAtEnd(URL_SUFFIX.EMAIL, CONTACT_TYPES.EMAIL, POSITIONS.FIFTH);
        });

        test("Add FIFTH PHONE", async() => {
            await addNonMainContactAtEnd(URL_SUFFIX.PHONE, CONTACT_TYPES.PHONE, POSITIONS.FIFTH);
        });

        test("Add FIFTH ADDRESS", async() => {
            await addNonMainContactAtEnd(URL_SUFFIX.ADDRESS, CONTACT_TYPES.ADDRESS, POSITIONS.FIFTH);
        });


        test("Add EMAIL at full email set should throw error", async() => {
            participantContactId = await createParticipantContact(5, 1, 1);
            await sendRequestAndExpectError(addNonMainContactAtEnd, URL_SUFFIX.EMAIL, CONTACT_TYPES.EMAIL, POSITIONS.FIFTH);
        });

        test("Add PHONE at full phone set should throw error", async() => {
            participantContactId = await createParticipantContact(1, 1, 5);
            await sendRequestAndExpectError(addNonMainContactAtEnd, URL_SUFFIX.PHONE, CONTACT_TYPES.PHONE, POSITIONS.FIFTH);
        });

        test("Add ADDRESS at full address set should throw error", async() => {
            participantContactId = await createParticipantContact(1, 5, 1);
            await sendRequestAndExpectError(addNonMainContactAtEnd, URL_SUFFIX.ADDRESS, CONTACT_TYPES.ADDRESS, POSITIONS.FIFTH);
        });


        test("Add EMAIL with invalid type should throw error", async() => {
            await sendRequestAndExpectError(addNonMainContactAtEnd, URL_SUFFIX.EMAIL, INVALID_TYPE, POSITIONS.SECOND);
        });

        test("Add ADDRESS with invalid type should throw error", async() => {
            await sendRequestAndExpectError(addNonMainContactAtEnd, URL_SUFFIX.ADDRESS, INVALID_TYPE, POSITIONS.SECOND);
        });

        test("Add PHONE with invalid type should throw error", async() => {
            await sendRequestAndExpectError(addNonMainContactAtEnd, URL_SUFFIX.PHONE, INVALID_TYPE, POSITIONS.SECOND);
        });


        test("Add EMAIL with invalid position should throw error", async() => {
            await sendRequestAndExpectError(addNonMainContactAtEnd, URL_SUFFIX.EMAIL, CONTACT_TYPES.EMAIL, INVALID_POSITION);
        });

        test("Add ADDRESS with invalid position should throw error", async() => {
            await sendRequestAndExpectError(addNonMainContactAtEnd, URL_SUFFIX.ADDRESS, CONTACT_TYPES.ADDRESS, INVALID_POSITION);
        });

        test("Add PHONE with invalid position should throw error", async() => {
            await sendRequestAndExpectError(addNonMainContactAtEnd, URL_SUFFIX.PHONE, CONTACT_TYPES.PHONE, INVALID_POSITION);
        });
    });

    describe('Delete Non Main Contact Method Suite', () => {

        async function deleteNonMainContact(contactType, position){
            participantContactId = await createParticipantContact(5, 5, 5);

            const reqData = requestHelper.mountRequestData(token, URL+"delete-non-main", "POST",
                mountDto(participantContactId, position, undefined, contactType));
            const response = await requestHelper.sendRequestAndGetResponseData(reqData);
            expect(response).toBeTrue();

            const prevArraySize = Object.keys(participantContact[contactType]).length;
            const participantContactCopy = Object.assign({}, participantContact);
            let positions = Object.values(POSITIONS).slice(0, prevArraySize+1);

            const positionIndex = positions.indexOf(position);
            for (let i = positionIndex; i < positions.length-1; i++) {
                participantContactCopy[contactType][positions[i]] = participantContactCopy[contactType][positions[i+1]];
            }
            participantContactCopy[contactType][positions[prevArraySize-1]] = undefined;
            positions.pop();

            const gettedParticipantContact = await checkResultWithGetMethod(participantContactCopy, contactType, positions);
            expect(Object.keys(gettedParticipantContact[contactType])).toBeArrayOfSize(prevArraySize-1);
        }

        test("Delete MAIN EMAIL should throw error", async() => {
            await sendRequestAndExpectError(deleteNonMainContact, CONTACT_TYPES.EMAIL, POSITIONS.MAIN);
        });

        test("Delete MAIN ADDRESS should throw error", async() => {
            await sendRequestAndExpectError(deleteNonMainContact, CONTACT_TYPES.ADDRESS, POSITIONS.MAIN);
        });

        test("Delete MAIN PHONE should throw error", async() => {
            await sendRequestAndExpectError(deleteNonMainContact, CONTACT_TYPES.PHONE, POSITIONS.MAIN);
        });


        test("Delete SECOND EMAIL", async() => {
            await deleteNonMainContact(CONTACT_TYPES.EMAIL, POSITIONS.SECOND);
        });

        test("Delete SECOND ADDRESS", async() => {
            await deleteNonMainContact(CONTACT_TYPES.ADDRESS, POSITIONS.SECOND);
        });

        test("Delete SECOND PHONE", async() => {
            await deleteNonMainContact(CONTACT_TYPES.PHONE, POSITIONS.SECOND);
        });


        test("Delete THIRD EMAIL", async() => {
            await deleteNonMainContact(CONTACT_TYPES.EMAIL, POSITIONS.THIRD);
        });

        test("Delete THIRD ADDRESS", async() => {
            await deleteNonMainContact(CONTACT_TYPES.ADDRESS, POSITIONS.THIRD);
        });

        test("Delete THIRD PHONE", async() => {
            await deleteNonMainContact(CONTACT_TYPES.PHONE, POSITIONS.THIRD);
        });


        test("Delete FOURTH EMAIL", async() => {
            await deleteNonMainContact(CONTACT_TYPES.EMAIL, POSITIONS.FOURTH);
        });

        test("Delete FOURTH ADDRESS", async() => {
            await deleteNonMainContact(CONTACT_TYPES.ADDRESS, POSITIONS.FOURTH);
        });

        test("Delete FOURTH PHONE", async() => {
            await deleteNonMainContact(CONTACT_TYPES.PHONE, POSITIONS.FOURTH);
        });


        test("Delete FIFTH EMAIL", async() => {
            await deleteNonMainContact(CONTACT_TYPES.EMAIL, POSITIONS.FIFTH);
        });

        test("Delete FIFTH ADDRESS", async() => {
            await deleteNonMainContact(CONTACT_TYPES.ADDRESS, POSITIONS.FIFTH);
        });

        test("Delete FIFTH PHONE", async() => {
            await deleteNonMainContact(CONTACT_TYPES.PHONE, POSITIONS.FIFTH);
        });


        test("Delete EMAIL with invalid type should throw error", async() => {
            await sendRequestAndExpectError(deleteNonMainContact, INVALID_TYPE, POSITIONS.SECOND);
        });

        test("Delete EMAIL with invalid position should throw error", async() => {
            await sendRequestAndExpectError(deleteNonMainContact, CONTACT_TYPES.EMAIL, INVALID_POSITION);
        });

        test("Delete ADDRESS with invalid position should throw error", async() => {
            await sendRequestAndExpectError(deleteNonMainContact, CONTACT_TYPES.ADDRESS, INVALID_POSITION);
        });

        test("Delete PHONE with invalid position should throw error", async() => {
            await sendRequestAndExpectError(deleteNonMainContact, CONTACT_TYPES.PHONE, INVALID_POSITION);
        });
    });

});

