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
            await pageOtus.waitForMilliseconds(4000);//abre a page otus
            await pageOtus.clickWithWait("button[ng-click='$ctrl.startMonitoring()']");//clica em atividades do centro
            await pageOtus.waitForMilliseconds(4000);
            var centro1 = await pageOtus.page.$$("md-input-container[ng-repeat='center in $ctrl.centers']");
            await centro1[0].click();//Desativa MG
            await pageOtus.waitForMilliseconds(4000);
            var centro2 = await pageOtus.page.$$("md-input-container[ng-repeat='center in $ctrl.centers']");
            await centro2[1].click();//Desativa SP
            await pageOtus.waitForMilliseconds(4000);
            var centro3 = await pageOtus.page.$$("md-input-container[ng-repeat='center in $ctrl.centers']");
            await centro3[2].click();//Desativa RS
            await pageOtus.waitForMilliseconds(3000);
            var centro4 = await pageOtus.page.$$("md-input-container[ng-repeat='center in $ctrl.centers']");
            await centro4[3].click();//Desativa RJ
            await pageOtus.waitForMilliseconds(3000);
            var centro5 = await pageOtus.page.$$("md-input-container[ng-repeat='center in $ctrl.centers']");
            await centro5[4].click();//Desativa ES
            await pageOtus.waitForMilliseconds(3000);
            var centro6 = await pageOtus.page.$$("md-input-container[ng-repeat='center in $ctrl.centers']");
            await centro6[5].click();//Desativa BA
            await pageOtus.waitForMilliseconds(3000);
            var centro7 = await pageOtus.page.$$("md-input-container[ng-repeat='center in $ctrl.centers']");
            await centro7[2].click();//Ativa RS
            await pageOtus.waitForMilliseconds(3000);
            var limpar1 = await pageOtus.page.$$("button[ng-click='clear()']");
            await limpar1[0].click();
            await pageOtus.waitForMilliseconds(3000);
            var calendar1 = await pageOtus.page.$$("button[ng-click='openCalendarDiag($event)']");
            await calendar1[0].click();
            await pageOtus.waitForMilliseconds(3000);
            var mes1 = await pageOtus.page.$$("div[ng-click='picker.openMenu($mdMenu, $event)']");
            await mes1[0].click();
            await pageOtus.waitLoad(3000);

        });

    })

];


