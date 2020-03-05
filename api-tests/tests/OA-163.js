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
const CONTACT_ENUM = {
    EMAIL:{
        TYPE: "EMAIL",
        MAIN_FIELD_NAME: "mainEmail",
        SECONDARY_FIELD_NAME: "secondaryEmails"
    },
    ADDRESS:{
        TYPE: "ADDRESS",
        MAIN_FIELD_NAME: "mainAddress",
        SECONDARY_FIELD_NAME: "secondaryAddresses"
    },
    PHONE:{
        TYPE: "PHONE",
        MAIN_FIELD_NAME: "mainPhoneNumber",
        SECONDARY_FIELD_NAME: "secondaryPhoneNumbers"
    },
};
const RN = 1234567;
let participantContactId = undefined;

const participantContact = {
    "objectType": OBJECT_TYPE,
    "recruitmentNumber": RN,
    "mainEmail": mountNewContact("user@gmail"),
    "mainAddress": mountNewContact("Rua A, 000, POA, RS"),
    "mainPhoneNumber": mountNewContact("51987654321"),
    "secondaryEmails": [
        mountNewContact("user@terra", "email da mae"),
        mountNewContact("user@bol", "email velho"),
        mountNewContact("user@otus")
    ],
    "secondaryAddresses": [
        mountNewContact("Av X, 0, Rainbow City", "casa da mae"),
        mountNewContact("Rua dos Bobos, 0", "Dona Jo"),
        mountNewContact()
    ],
    "secondaryPhoneNumbers": [
        mountNewContact("51909090909", "esposa"),
        mountNewContact(),
        mountNewContact("5522334455")
    ]
};

function mountNewContact(value, observation=undefined){
    return {
        "contactValue": value,
        "observation": observation
    }
}

function mountDto(_id, type, participantContactItem, secondaryContactIndex){
    return{
        "_id": _id,
        "type": type,
        "participantContactItem": participantContactItem,
        "secondaryContactIndex": secondaryContactIndex
    }
}

async function createParticipantContact(){
    let participantContactJson = {};
    participantContactJson = Object.assign(participantContactJson, participantContact);
    participantContactJson._id = undefined;
    const reqData = requestHelper.mountRequestData(token, URL, "POST", participantContactJson);
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

//*************************************************
// Tests

describe('Create and DeleteById Methods Suite', () => {

    let participantContactId = undefined;
    
    test("Create Method Test", async() => {
        participantContactId = await createParticipantContact();
    });

    test("Delete Method Test", async() => {
        if(participantContactId) {
            await deleteParticipantContact(participantContactId);
        }
    });
});

describe("Others Methods Suite", () => {

    beforeEach(async() => {
        participantContactId = await createParticipantContact();
    });

    afterEach(async() => {
        if(participantContactId) {
            await deleteParticipantContact(participantContactId);
            participantContactId = undefined;
        }
    });

    let getMethodWorks = false;

    async function requestParticipantContact(){
        const reqData = requestHelper.mountRequestData(token, URL+participantContactId, "GET");
        return await requestHelper.sendRequestAndGetResponseData(reqData);
    }

    async function checkResultWithGetMethod(contactType, fieldNamesToCheck){
        // assuming that get method works correctly
        const gettedParticipantContact = await requestParticipantContact();
        for(let fieldName of fieldNamesToCheck){
            const expectedValue = participantContact[fieldName];
            const receivedValue = gettedParticipantContact[fieldName];
            try{
                expect(receivedValue).toEqual(expectedValue);
            }
            catch (e) {
                console.error(`${fieldName}: expected ${expectedValue} but received ${receivedValue}`);
            }
        }
        return gettedParticipantContact;
    }

    describe('Get Methods Suite', () => {

        test("Get by ID Method Test", async() => {
            const gettedParticipantContact = await requestParticipantContact();
            expect(gettedParticipantContact).not.toBeNull();
            expect(gettedParticipantContact.mainEmail).toEqual(participantContact.mainEmail);
            getMethodWorks = true;
        });

        test("Get by RN Method Test", async() => {
            const reqData = requestHelper.mountRequestData(token, URL+"rn/"+RN, "GET");
            const gettedParticipantContact = await requestHelper.sendRequestAndGetResponseData(reqData);
            expect(gettedParticipantContact).not.toBeNull();
            expect(gettedParticipantContact.mainEmail).toEqual(participantContact.mainEmail);
        });
    });

    describe('Update Main Contact Method Suite', () => {

        async function updateMainContact(contactEnum, participantContactItem){
            const reqData = requestHelper.mountRequestData(token, URL+"update-main", "PUT",
                mountDto(participantContactId, contactEnum.TYPE, participantContactItem));
            const response = await requestHelper.sendRequestAndGetResponseData(reqData);
            expect(response).toBeTrue();
            participantContact[contactEnum.MAIN_FIELD_NAME] = participantContactItem;
            await checkResultWithGetMethod(contactEnum.TYPE, [contactEnum.SECONDARY_FIELD_NAME]);
        }

        test("Update Main EMAIL Test", async() => {
            const participantContactItem = mountNewContact("newMainEmail@otus", "new main email");
            await updateMainContact(CONTACT_ENUM.EMAIL, participantContactItem);
        });

        test("Update Main ADDRESS Test", async() => {
            const participantContactItem = mountNewContact("Av ABC, 123, SomewhereOverTheRainbow City", "my house");
            await updateMainContact(CONTACT_ENUM.ADDRESS, participantContactItem);
        });

        test("Update Main PHONE Test", async() => {
            const participantContactItem = mountNewContact("newMainEmail@otus", "new main email");
            await updateMainContact(CONTACT_ENUM.PHONE, participantContactItem);
        });

    });

    describe('Add Secondary Contact Method Suite', () => {

        async function addSecondaryContactAtEnd(contactEnum, participantContactItem){
            const prevArraySize = participantContact[contactEnum.SECONDARY_FIELD_NAME].length;
            const reqData = requestHelper.mountRequestData(token, URL+"add-secondary", "PUT",
                mountDto(participantContactId, contactEnum.TYPE, participantContactItem));
            const response = await requestHelper.sendRequestAndGetResponseData(reqData);
            expect(response).toBeTrue();

            const gettedParticipantContact = await requestParticipantContact();
            expect(gettedParticipantContact[contactEnum.SECONDARY_FIELD_NAME]).toBeArrayOfSize(prevArraySize+1);
            let i;
            for (i = 0; i < prevArraySize; i++) {
                expect(gettedParticipantContact[contactEnum.SECONDARY_FIELD_NAME][i]).toEqual(participantContact[contactEnum.SECONDARY_FIELD_NAME][i])
            }
            expect(gettedParticipantContact[contactEnum.SECONDARY_FIELD_NAME][i]).toEqual(participantContactItem);
        }

        test("Add Secondary EMAIL Test", async() => {
            const participantContactItem = mountNewContact("plusEmail@otus", "new email");
            await addSecondaryContactAtEnd(CONTACT_ENUM.EMAIL, participantContactItem);
        });

        test("Add Secondary ADDRESS Test", async() => {
            const participantContactItem = mountNewContact("Av ABC, 123, SomewhereOverTheRainbow City", "my house");
            await addSecondaryContactAtEnd(CONTACT_ENUM.ADDRESS, participantContactItem);
        });

        test("Add Secondary PHONE Test", async() => {
            const participantContactItem = mountNewContact("51123456789", "office");
            await addSecondaryContactAtEnd(CONTACT_ENUM.PHONE, participantContactItem);
        });
    });

    describe('Delete Secondary Contact Method Suite', () => {

        async function deleteSecondaryContactAtEnd(contactEnum, secondaryContactIndex){
            const prevArraySize = participantContact[contactEnum.SECONDARY_FIELD_NAME].length;
            const reqData = requestHelper.mountRequestData(token, URL+"secondary", "DELETE",
                mountDto(participantContactId, contactEnum.TYPE, undefined, secondaryContactIndex));
            const response = await requestHelper.sendRequestAndGetResponseData(reqData);
            expect(response).toBeTrue();

            let participantContactWithoutDeletedContact = Object.assign({}, participantContact);
            participantContactWithoutDeletedContact[contactEnum.SECONDARY_FIELD_NAME] =
                participantContactWithoutDeletedContact[contactEnum.SECONDARY_FIELD_NAME].slice(0,secondaryContactIndex).concat(
                    participantContactWithoutDeletedContact[contactEnum.SECONDARY_FIELD_NAME].slice(secondaryContactIndex+1, prevArraySize)
            );

            const gettedParticipantContact = await requestParticipantContact();
            expect(gettedParticipantContact[contactEnum.SECONDARY_FIELD_NAME]).toBeArrayOfSize(prevArraySize-1);
            let i;
            for (i = 0; i < prevArraySize-1; i++) {
                expect(gettedParticipantContact[contactEnum.SECONDARY_FIELD_NAME][i]).toEqual(participantContactWithoutDeletedContact[contactEnum.SECONDARY_FIELD_NAME][i])
            }
        }

        test("Delete Secondary EMAIL Test - First", async() => {
            await deleteSecondaryContactAtEnd(CONTACT_ENUM.EMAIL, 0);
        });

        test("Delete Secondary EMAIL Test - Middle", async() => {
            await deleteSecondaryContactAtEnd(CONTACT_ENUM.EMAIL, 1);
        });

        test("Delete Secondary EMAIL Test - Last", async() => {
            await deleteSecondaryContactAtEnd(CONTACT_ENUM.EMAIL, 2);
        });

        test("Delete Secondary ADDRESS Test - First", async() => {
            await deleteSecondaryContactAtEnd(CONTACT_ENUM.ADDRESS, 0);
        });

        test("Delete Secondary ADDRESS Test - Middle", async() => {
            await deleteSecondaryContactAtEnd(CONTACT_ENUM.ADDRESS, 1);
        });

        test("Delete Secondary ADDRESS Test - Last", async() => {
            await deleteSecondaryContactAtEnd(CONTACT_ENUM.ADDRESS, 2);
        });

        test("Delete Secondary PHONE NUMBER Test - First", async() => {
            await deleteSecondaryContactAtEnd(CONTACT_ENUM.PHONE, 0);
        });

        test("Delete Secondary PHONE NUMBER Test - Middle", async() => {
            await deleteSecondaryContactAtEnd(CONTACT_ENUM.PHONE, 1);
        });

        test("Delete Secondary PHONE NUMBER Test - Last", async() => {
            await deleteSecondaryContactAtEnd(CONTACT_ENUM.PHONE, 2);
        });
    });

});
