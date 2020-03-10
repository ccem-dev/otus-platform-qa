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
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");//clica no botão "Listar"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getNextPage($ctrl.stuntmanSearchSettings)']");//clica no botão "Próxima Página"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPreviousPage($ctrl.stuntmanSearchSettings)']");//clica no botão "Página Anteior"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.runCustomPagination($ctrl.stuntmanSearchSettings)']");//clica no botão "Nova Consulta"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("md-switch[aria-label='ActivityType']");
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("md-radio-button[value='FINALIZED']");
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("md-radio-button[value='ALL']");
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.chanceStateCriteria()']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("md-radio-button[aria-label='Em Aberto']");
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.chanceInputViewState(item)']");//clica no numero de recrutamento
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.typeWithWait("input[ ng-if='!floatingLabel']", "5005283");//escreve o nome do recrutamento
            await pageOtus.waitForMilliseconds(2000);//espera por 2 segundos
            var mdVirtualRepeatContainer = await pageOtus.page.$$("md-virtual-repeat-container[ng-hide='$mdAutocompleteCtrl.hidden']");//cria uma variável para escolher um dos nomes da lista
            await mdVirtualRepeatContainer[0].click();/*escolhe o primeiro nome*/
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.launchSidenav()']");
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.home()']");
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos

        });

        test('Test- Formulário ', async () => {
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.pendencyViewer()']");// clica no botão "visualizador de pendências"
            await pageOtus.waitForMilliseconds(2000);//espera por 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.openFilters()']");//clica para mostrar os filtros
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");//clica no botão "Listar"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getNextPage($ctrl.stuntmanSearchSettings)']");//clica no botão "Próxima Página"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPreviousPage($ctrl.stuntmanSearchSettings)']");//clica no botão "Página Anteior"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.runCustomPagination($ctrl.stuntmanSearchSettings)']");//clica no botão "Nova Consulta"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("md-switch[aria-label='ActivityType']");
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("md-radio-button[value='FINALIZED']");
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("md-radio-button[value='ALL']");
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.chanceStateCriteria()']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("md-radio-button[aria-label='Em Aberto']");
            await pageOtus.clickWithWait("button[aria-label='Formulário']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.typeWithWait("input[ng-model='$ctrl.searchSettings.filter[item.title]']", "FRC");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.launchSidenav()']");
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.home()']");
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos

        });
        test('Test- Solicitante', async () => {
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.pendencyViewer()']");// clica no botão "visualizador de pendências"
            await pageOtus.waitForMilliseconds(2000);//espera por 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.openFilters()']");//clica para mostrar os filtros
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");//clica no botão "Listar"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getNextPage($ctrl.stuntmanSearchSettings)']");//clica no botão "Próxima Página"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPreviousPage($ctrl.stuntmanSearchSettings)']");//clica no botão "Página Anteior"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.runCustomPagination($ctrl.stuntmanSearchSettings)']");//clica no botão "Nova Consulta"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("md-switch[aria-label='ActivityType']");
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("md-radio-button[value='FINALIZED']");
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("md-radio-button[value='ALL']");
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.chanceStateCriteria()']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("md-radio-button[aria-label='Em Aberto']");
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[aria-label='Solicitante']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.typeWithWait("input[placeholder='Solicitante']", "diogo");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("li[ng-click='$mdAutocompleteCtrl.select($index)']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.launchSidenav()']");
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.home()']");
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos

        });
        test('Test- ID ', async () => {
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.pendencyViewer()']");// clica no botão "visualizador de pendências"
            await pageOtus.waitForMilliseconds(2000);//espera por 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.openFilters()']");//clica para mostrar os filtros
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");//clica no botão "Listar"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getNextPage($ctrl.stuntmanSearchSettings)']");//clica no botão "Próxima Página"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPreviousPage($ctrl.stuntmanSearchSettings)']");//clica no botão "Página Anteior"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.runCustomPagination($ctrl.stuntmanSearchSettings)']");//clica no botão "Nova Consulta"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("md-switch[aria-label='ActivityType']");
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("md-radio-button[value='FINALIZED']");
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("md-radio-button[value='ALL']");
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.chanceStateCriteria()']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("md-radio-button[aria-label='Em Aberto']");
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[aria-label='ID']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.typeWithWait("input[aria-label='ID']", "123");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.launchSidenav()']");
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.home()']");
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos

        });

        test('Test- Responsável ', async () => {
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.pendencyViewer()']");// clica no botão "visualizador de pendências"
            await pageOtus.waitForMilliseconds(2000);//espera por 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.openFilters()']");//clica para mostrar os filtros
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");//clica no botão "Listar"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getNextPage($ctrl.stuntmanSearchSettings)']");//clica no botão "Próxima Página"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPreviousPage($ctrl.stuntmanSearchSettings)']");//clica no botão "Página Anteior"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.runCustomPagination($ctrl.stuntmanSearchSettings)']");//clica no botão "Nova Consulta"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("md-switch[aria-label='ActivityType']");
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("md-radio-button[value='FINALIZED']");
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("md-radio-button[value='ALL']");
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.chanceStateCriteria()']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("md-radio-button[aria-label='Em Aberto']");
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[aria-label='Responsável']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.typeWithWait("input[aria-label='Responsável']", "diogo");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("li[aria-setsize='2']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.launchSidenav()']");
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.home()']");
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos

        });

        test('Test- vencimento ', async () => {
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.pendencyViewer()']");// clica no botão "visualizador de pendências"
            await pageOtus.waitForMilliseconds(2000);//espera por 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.openFilters()']");//clica para mostrar os filtros
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");//clica no botão "Listar"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getNextPage($ctrl.stuntmanSearchSettings)']");//clica no botão "Próxima Página"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPreviousPage($ctrl.stuntmanSearchSettings)']");//clica no botão "Página Anteior"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.runCustomPagination($ctrl.stuntmanSearchSettings)']");//clica no botão "Nova Consulta"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("md-switch[aria-label='ActivityType']");
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("md-radio-button[value='FINALIZED']");
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("md-radio-button[value='ALL']");
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.chanceStateCriteria()']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("md-radio-button[aria-label='Em Aberto']");
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[aria-label='Vencimento']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='ctrl.openCalendarPane($event)']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("td[aria-label='Wednesday March 11 2020']");
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.launchSidenav()']");
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.home()']");
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos

        });

    })

];




