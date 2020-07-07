const lib = require ('../code/otus/lib');

let browser, pageOtus, selectors;
let suiteArray = [], errorLogger;
const PageElement = require('../code/classes/PageElement');


beforeAll(async () => {
    [browser, pageOtus, errorLogger, selectors] = await lib.doBeforeAll(suiteArray);
});

beforeEach(async () => {
    console.log('RUNNING TEST\n', errorLogger.currSpecName);
});

afterEach(async () => {
    errorLogger.advanceToNextSpec();
});

afterAll(async () => {
    await errorLogger.exportTestResultLog();
    await browser.close();

});



const ActivityQuestionAnswer = require('../code/otus/classes/activities/ActivityQuestionAnswer');
const PreviewPage = require('../code/otus/classes/PreviewPage');
const Button = require('../code/classes/Button');
const InputField = require('../code/classes/InputField');


suiteArray = [


    describe('Test Suite A', () => {

        xtest('Test expect PASS', async () => {
            let x = 1;
            expect(x).toBe(1);
        });

        xtest('Test expect FAIL', async () => {
            let x = 1;
            expect(x).toBe(0);
        });


        test('Test 1', async () => {
            await pageOtus.waitForMilliseconds(5000);
            await pageOtus.clickWithWait("button[ng-if='attrs.showParticipantsButton']");//exibir todos participantes
            await pageOtus.waitForMilliseconds(5000);
            var verPart = await pageOtus.page.$$("button[class='md-icon-button  md-button']"); //seleciona todos participante
            await verPart[0].click();/*escolhe o primeiro participante*/
            await pageOtus.waitForMilliseconds(5000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.resetPassword()']");
            await pageOtus.waitForMilliseconds(5000);


        });
    })


];