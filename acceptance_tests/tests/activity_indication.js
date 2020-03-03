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

        test('Test-número de recrutamento', async () => {
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.pendencyViewer()']");// clica no botão "visualizador de pendências"
            await pageOtus.waitForMilliseconds(2000);//espera por 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.openFilters()']");//clica para mostrar os filtros
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.chanceInputViewState(item)']");//clica no numero de recrutamento
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.typeWithWait("input[ ng-if='!floatingLabel']", "Joao");//escreve o nome do recrutamento
            await pageOtus.waitForMilliseconds(2000);//espera por 2 segundos
            var mdVirtualRepeatContainer = await pageOtus.page.$$("md-virtual-repeat-container[ng-hide='$mdAutocompleteCtrl.hidden']");//cria uma variável para escolher um dos nomes da lista
            await mdVirtualRepeatContainer[0].click();/*escolhe o primeiro nome*/
            await pageOtus.waitForMilliseconds(2000);// espera 2 segundos
            await pageOtus.clickWithWait("button[ ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("md-switch[aria-label='ActivityType']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("md-radio-button[value='FINALIZED']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("md-radio-button[value='ALL']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ aria-label='critérios de ordernação']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.launchSidenav()']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.home()']");
            await pageOtus.waitForMilliseconds(2000);

        });

        test('Test - sigla do formulário', async () => {
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.pendencyViewer()']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.openFilters()']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[aria-label='Sigla do Formulário']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.typeWithWait("input[ng-model='$ctrl.searchSettings.filter[item.title]']", "FRC");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("md-switch[aria-label='ActivityType']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("md-radio-button[value='FINALIZED']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("md-radio-button[value='ALL']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ aria-label='critérios de ordernação']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.launchSidenav()']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.home()']");
            await pageOtus.waitForMilliseconds(2000);

        });

        test('Test - Solicitante', async () => {
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.pendencyViewer()']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.openFilters()']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[aria-label='Solicitante']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.typeWithWait("input[placeholder='Solicitante']", "carol");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("li[ng-click='$mdAutocompleteCtrl.select($index)']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("md-switch[aria-label='ActivityType']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("md-radio-button[value='FINALIZED']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("md-radio-button[value='ALL']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ aria-label='critérios de ordernação']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.launchSidenav()']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.home()']");
            await pageOtus.waitForMilliseconds(2000);


        });

        test('Test - ID externo', async () => {
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.pendencyViewer()']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.openFilters()']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[aria-label='ID Externo']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.typeWithWait("input[aria-label='ID Externo']", "123");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("md-switch[aria-label='ActivityType']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("md-radio-button[value='FINALIZED']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("md-radio-button[value='ALL']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ aria-label='critérios de ordernação']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.launchSidenav()']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.home()']");
            await pageOtus.waitForMilliseconds(2000);

        });

        test('Test - Responsável', async () => {
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.pendencyViewer()']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.openFilters()']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[aria-label='Responsável']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.typeWithWait("input[aria-label='Responsável']", "diogo");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("li[aria-setsize='2']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("md-switch[aria-label='ActivityType']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("md-radio-button[value='FINALIZED']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("md-radio-button[value='ALL']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ aria-label='critérios de ordernação']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.launchSidenav()']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.home()']");
            await pageOtus.waitForMilliseconds(2000);

        });

        test('Test - Data de vencimento', async () => {
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.pendencyViewer()']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.openFilters()']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[aria-label='Data de Vencimento']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='ctrl.openCalendarPane($event)']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("td[aria-label='Wednesday March 11 2020']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("md-switch[aria-label='ActivityType']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("md-radio-button[value='FINALIZED']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("md-radio-button[value='ALL']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ aria-label='critérios de ordernação']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.launchSidenav()']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.home()']");
            await pageOtus.waitForMilliseconds(2000);

        });

    })

];


// test('Test 1p', async () => {
//     await pageOtus.waitForMilliseconds(2000);
//     await pageOtus.clickWithWait("button[ng-click='$ctrl.pendencyViewer()']");
//     await pageOtus.waitForMilliseconds(2000);
//     await pageOtus.clickWithWait("button[ng-click='$ctrl.openFilters()']");
//     await pageOtus.waitForMilliseconds(2000);
//     await pageOtus.clickWithWait("button[ng-click='$ctrl.chanceInputViewState(item)']");
//     await pageOtus.waitForMilliseconds(2000);
//     await pageOtus.typeWithWait("input[ ng-if='!floatingLabel']", "Joao");
//     await pageOtus.waitForMilliseconds(2000);
//     var mdVirtualRepeatContainer = await pageOtus.page.$$("md-virtual-repeat-container[ng-hide='$mdAutocompleteCtrl.hidden']");
//     await mdVirtualRepeatContainer[0].click();/*escolhe o primeiro nome*/
//     await pageOtus.waitForMilliseconds(2000);
//     var mdIcon = await pageOtus.page.$$("md-icon[ng-click='$ctrl.clear(item)']");
//     await mdIcon[0].click();
//     await pageOtus.waitForMilliseconds(2000);
//     await pageOtus.clickWithWait("button[aria-label='Sigla do Formulário']");
//     await pageOtus.waitForMilliseconds(2000);
//     await pageOtus.typeWithWait("input[ng-model='$ctrl.searchSettings.filter[item.title]']", "FRC");
//     await pageOtus.waitForMilliseconds(2000);
//     await pageOtus.clickWithWait("button[aria-label='Solicitante']");
//     await pageOtus.waitForMilliseconds(2000);
//     await pageOtus.typeWithWait("input[placeholder='Solicitante']", "carol");
//     await pageOtus.waitForMilliseconds(2000);
//     await pageOtus.clickWithWait("li[ng-click='$mdAutocompleteCtrl.select($index)']");
//     await pageOtus.waitForMilliseconds(2000);
//     await pageOtus.clickWithWait("button[aria-label='ID Externo']");
//     await pageOtus.waitForMilliseconds(2000);
//     await pageOtus.typeWithWait("input[aria-label='ID Externo']", "123");
//     await pageOtus.waitForMilliseconds(2000);
//     await pageOtus.clickWithWait("button[aria-label='Responsável']");
//     await pageOtus.waitForMilliseconds(2000);
//     await pageOtus.typeWithWait("input[aria-label='Responsável']", "diogo");
//     await pageOtus.waitForMilliseconds(2000);
//     await pageOtus.clickWithWait("li[aria-setsize='2']");
//     await pageOtus.waitForMilliseconds(2000);
//     await pageOtus.clickWithWait("button[aria-label='Data de Vencimento']");
//     await pageOtus.waitForMilliseconds(2000);
//     await pageOtus.clickWithWait("button[ng-click='ctrl.openCalendarPane($event)']");
//     await pageOtus.waitForMilliseconds(2000);
//     await pageOtus.clickWithWait("td[aria-label='Wednesday March 11 2020']");
//     await pageOtus.waitForMilliseconds(2000);
//     await pageOtus.clickWithWait("button[ ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");
//     await pageOtus.waitForMilliseconds(2000);
//     await pageOtus.clickWithWait("md-switch[aria-label='ActivityType']");
//     await pageOtus.waitForMilliseconds(2000);
//     await pageOtus.clickWithWait("md-radio-button[value='FINALIZED']");
//     await pageOtus.waitForMilliseconds(2000);
//     await pageOtus.clickWithWait("md-radio-button[value='ALL']");
//     await pageOtus.waitForMilliseconds(2000);
//     await pageOtus.clickWithWait("button[ aria-label='critérios de ordernação']");
//     await pageOtus.waitForMilliseconds(2000);
//     await pageOtus.clickWithWait("button[ng-click='$ctrl.launchSidenav()']");
//     await pageOtus.waitForMilliseconds(2000);
//     await pageOtus.clickWithWait("button[ng-click='$ctrl.home()']");
//     await pageOtus.waitForMilliseconds(2000);
//
// });


