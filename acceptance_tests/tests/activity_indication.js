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
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.pendencyViewer()']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.openFilters()']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.chanceInputViewState(item)']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.typeWithWait("input[ ng-if='!floatingLabel']", "Joao");
            await pageOtus.waitForMilliseconds(2000);
            var mdVirtualRepeatContainer = await pageOtus.page.$$("md-virtual-repeat-container[ng-hide='$mdAutocompleteCtrl.hidden']");
            await mdVirtualRepeatContainer[0].click();/*escolhe o primeiro nome*/
            await pageOtus.waitForMilliseconds(2000);
            var mdIcon = await pageOtus.page.$$("md-icon[ng-click='$ctrl.clear(item)']");
            await mdIcon[0].click();
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[aria-label='Usuário Solicitante']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.typeWithWait("input[ng-class='::inputClass']", "carol");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("li[ng-click='$mdAutocompleteCtrl.select($index)']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$mdAutocompleteCtrl.clear($event)']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[aria-label='Revisor Responsável']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[aria-label='Revisor Responsável']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.typeWithWait("input[placeholder='Revisor Responsável']", "bruce");
            await pageOtus.waitForMilliseconds(2000);
            var mdVirtualRepeatContainer2 = await pageOtus.page.$$("md-virtual-repeat-container[ng-hide='$mdAutocompleteCtrl.hidden']");
            await mdVirtualRepeatContainer2[1].click();
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ aria-label='Sigla do Formulário']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.typeWithWait("input[aria-label='Sigla do Formulário']", "FRC");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[aria-label='Data de Vencimento']");
            await pageOtus.waitForMilliseconds(2000);






























        });

    })

];


