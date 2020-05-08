const lib = require ('../code/otus/lib');

let browser, pageOtus, selectors;
let suiteArray = [], errorLogger;
const PageElement = require('../code/classes/PageElement');

const selectors2 = {
    INPUT_AMOUNT_TO_APPLY: 'input[name=valorAplicar]',
    BOTAO_ORDENACAO:"md-switch[aria-checked='true']"
};


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
            let x = ("md-switch[aria-checked='false']");
            expect(x).toBe(true);
        });

        test('Test-número de recrutamento', async () => {
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.activatePendencyViewer()']");// clica no botão "visualizador de pendências"
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
            await pageOtus.clickWithWait("md-switch[aria-label='ActivityType']");//clica no botão de ordenação
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");//clica no botão listar
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("md-radio-button[value='FINALIZED']");//clica no botão "Finalizadas"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");//clica no botão listar
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("md-radio-button[value='ALL']");//clica no botão "Todas"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");//clica no botão listar
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.chanceStateCriteria()']");//clica em Critérios de Ordenação
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("md-radio-button[aria-label='Em Aberto']");//clica no botão "Em Aberto"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");//clica no botão listar
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.chanceInputViewState(item)']");//clica no numero de recrutamento
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.typeWithWait("input[ ng-if='!floatingLabel']", "5005283");//escreve o numero do recrutamento
            await pageOtus.waitForMilliseconds(2000);//espera por 2 segundos
            var mdVirtualRepeatContainer = await pageOtus.page.$$("md-virtual-repeat-container[ng-hide='$mdAutocompleteCtrl.hidden']");//cria uma variável para escolher um dos nomes da lista
            await mdVirtualRepeatContainer[0].click();/*escolhe o primeiro nome*/
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");//clica no botão listar
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("md-icon[ng-click='$ctrl.clear(item)']");//clica em limpar campo do recrutamento
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[aria-label='Recrutamento']");//clica no numero de recrutamento
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.typeWithWait("input[ ng-if='!floatingLabel']", "5002807");//escreve o numero do recrutamento
            await pageOtus.waitForMilliseconds(2000);//espera por 2 segundos
            var mdVirtualRepeatContainer2 = await pageOtus.page.$$("md-virtual-repeat-container[ng-hide='$mdAutocompleteCtrl.hidden']");//cria uma variável para escolher um dos nomes da lista
            await mdVirtualRepeatContainer2[0].click();/*escolhe o primeiro nome*/
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");//clica no botão listar
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.launchSidenav()']");//clica em otus projeto
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.home()']");//clica em início
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            const botaoOrdenacao = await pageOtus.$(selectors.BOTAO_ORDENACAO);
            expect(botaoOrdenacao).toBe(true);


        });




        xtest('Test- Formulário ', async () => {
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.activatePendencyViewer()']");// clica no botão "visualizador de pendências"
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
            await pageOtus.clickWithWait("md-switch[aria-label='ActivityType']");//clica no botão de ordenação
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");//clica no botão "Listar"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("md-radio-button[value='FINALIZED']");//clica no botão "Finalizadas"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");//clica no botão "Listar"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("md-radio-button[value='ALL']");//clica no botão "Todas"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");//clica no botão "Listar"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.chanceStateCriteria()']");//clica em Critérios de Ordenação
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("md-radio-button[aria-label='Em Aberto']");//clica no botão "Em Aberto"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");//clica no botão "Listar"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[aria-label='Formulário']");//clica no botão formulário
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.typeWithWait("input[ng-model='$ctrl.searchSettings.filter[item.title]']", "FRC");//input "FRC"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");//clica no botão listar
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("md-icon[ng-click='$ctrl.clear(item)']");//clica em limpar campo do formulário
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[aria-label='Formulário']");//clica no botão formulário
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.typeWithWait("input[ng-model='$ctrl.searchSettings.filter[item.title]']", "CSJ");//input "CSJ"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");//clica no botão "Listar"
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("md-icon[ng-click='$ctrl.clear(item)']");//clica em limpar campo do formulário
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[aria-label='Formulário']");//clica no botão formulário
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.typeWithWait("input[ng-model='$ctrl.searchSettings.filter[item.title]']", "DIEC");//input "CSJ"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");//clica no botão "Listar"
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("md-icon[ng-click='$ctrl.clear(item)']");//clica em limpar campo do formulário
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[aria-label='Formulário']");//clica no botão formulário
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.typeWithWait("input[ng-model='$ctrl.searchSettings.filter[item.title]']", "CISE");//input "CSJ"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");//clica no botão "Listar"
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.launchSidenav()']");//clica em otus projeto
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.home()']");//clica em início
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos


        });

        xtest('Test- Solicitante', async () => {
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.activatePendencyViewer()']");// clica no botão "visualizador de pendências"
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
            await pageOtus.clickWithWait("md-switch[aria-label='ActivityType']");//clica no botão de ordenação
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");//clica no botão "Listar"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("md-radio-button[value='FINALIZED']");//clica no botão "Finalizadas"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");//clica no botão "Listar"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("md-radio-button[value='ALL']");//clica no botão "Todas"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");//clica no botão "Listar"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.chanceStateCriteria()']");//clica em Critérios de Ordenação
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("md-radio-button[aria-label='Em Aberto']");//clica no botão "Em Aberto"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");//clica no botão "Listar"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[aria-label='Solicitante']");//clica no botão "Solicitante"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.typeWithWait("input[placeholder='Solicitante']", "bianca");//input "bianca"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("li[ng-click='$mdAutocompleteCtrl.select($index)']");
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");//clica no botão "Listar"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("md-icon[ng-click='$ctrl.clear(item)']");//clica em limpar campo do formulário
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.launchSidenav()']");//clica em otus projeto
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.home()']");//clica em início
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos

        });

        xtest('Test- ID ', async () => {
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.activatePendencyViewer()']");// clica no botão "visualizador de pendências"
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
            await pageOtus.clickWithWait("md-switch[aria-label='ActivityType']");//clica no botão de ordenação
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");//clica no botão "Listar"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("md-radio-button[value='FINALIZED']");//clica no botão "Finalizadas"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");//clica no botão "Listar"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("md-radio-button[value='ALL']");//clica no botão "Todas"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");//clica no botão "Listar"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.chanceStateCriteria()']");//clica em Critérios de Ordenação
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("md-radio-button[aria-label='Em Aberto']");//clica no botão "Em Aberto"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");//clica no botão "Listar"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[aria-label='ID']");//clica no botão "ID"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.typeWithWait("input[aria-label='ID']", "123");//input "123"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");//clica no botão "Listar"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.launchSidenav()']");//clica em otus projeto
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.home()']");//clica em início
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos

        });

        xtest('Test- Responsável ', async () => {
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.activatePendencyViewer()']");// clica no botão "visualizador de pendências"
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
            await pageOtus.clickWithWait("md-switch[aria-label='ActivityType']");//clica no botão de ordenação
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");//clica no botão "Listar"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("md-radio-button[value='FINALIZED']");//clica no botão "Finalizadas"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");//clica no botão "Listar"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("md-radio-button[value='ALL']");//clica no botão "Todas"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");//clica no botão "Listar"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.chanceStateCriteria()']");//clica em Critérios de Ordenação
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("md-radio-button[aria-label='Em Aberto']");//clica no botão "Em Aberto"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");//clica no botão "Listar"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[aria-label='Responsável']");//clica no botão responsável
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.typeWithWait("input[aria-label='Responsável']", "diogo");//input "diogo"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("li[aria-setsize='2']");
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");//clica no botão "Listar"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.launchSidenav()']");//clica em otus projeto
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.home()']");//clica em início
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos

        });

        xtest('Test- vencimento ', async () => {
            await pageOtus.waitForMilliseconds(2000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.activatePendencyViewer()']");// clica no botão "visualizador de pendências"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
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
            await pageOtus.clickWithWait("md-switch[aria-label='ActivityType']");//clica no botão de ordenação
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");//clica no botão "Listar"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("md-radio-button[value='FINALIZED']");//clica no botão "Finalizadas"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");//clica no botão "Listar"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("md-radio-button[value='ALL']");//clica no botão "Todas"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");//clica no botão "Listar"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.chanceStateCriteria()']");//clica em Critérios de Ordenação
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("md-radio-button[aria-label='Em Aberto']");//clica no botão "Em Aberto"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");//clica no botão "Listar"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[aria-label='Vencimento']");//clica no botão "vencimento"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='ctrl.openCalendarPane($event)']");//seleciona o calendário
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("td[aria-label='Wednesday March 11 2020']");//escolhe uma data
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.getPendencies($ctrl.searchSettings)']");//clica no botão "Listar"
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.launchSidenav()']");//clica em otus projeto
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos
            await pageOtus.clickWithWait("button[ng-click='$ctrl.home()']");//clica em início
            await pageOtus.waitForMilliseconds(2000);//espera 2 segundos




        });

    })

];




