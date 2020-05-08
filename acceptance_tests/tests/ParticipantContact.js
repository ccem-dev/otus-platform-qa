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
            await pageOtus.clickWithWait("button[ng-click='$ctrl.updateParticipant()']");//editar participante  selecionado
            await pageOtus.waitForMilliseconds(5000);
            await pageOtus.clickWithWait("button[ng-click='$ctrl.createParticipantContact()']");//adicionar participantes
            await pageOtus.waitForMilliseconds(5000);
            var editar1 = await pageOtus.page.$$("button[ng-click='$ctrl.enableEditMode(key)']");//editar telefone
            await editar1[0].click();
            // await pageOtus.clickWithWait("button[ng-click='$ctrl.enableEditMode(key)']");//editar telefone 1
            // await pageOtus.waitForMilliseconds(2000);
            await pageOtus.typeWithWait("input[ng-model='contactItem.value.content']", "51 940028922");//adicionar telfone
            await pageOtus.waitForMilliseconds(5000);
            await pageOtus.typeWithWait("input[ng-model='contactItem.observation']", "Casa");//observações
            await pageOtus.waitForMilliseconds(5000);
            var salvAr = await pageOtus.page.$$("button[ng-click='$ctrl.updateContact(contactItem, key, $ctrl.type)']");//salvar contato
            await salvAr[0].click();
            await pageOtus.waitForMilliseconds(5000);
            ///////////////////////////////////////////////////
            var editar2 = await pageOtus.page.$$("button[ng-click='$ctrl.enableEditMode(key)']");//editar email
            await editar2[1].click();
            await pageOtus.waitForMilliseconds(5000);
            await pageOtus.typeWithWait("input[type='email']","adriana@gmail.com");//adicionar email
            await pageOtus.waitForMilliseconds(5000);
            await pageOtus.typeWithWait("input[id='input_133']", "email 1");//observações do e-mail
            await pageOtus.waitForMilliseconds(5000);
            var salvAr2 = await pageOtus.page.$$("button[ng-click='$ctrl.updateContact(contactItem, key, $ctrl.type)']");//salvar e-mail
            await salvAr2[0].click();
            await pageOtus.waitForMilliseconds(5000);
            var editar3 = await pageOtus.page.$$("button[ng-click='$ctrl.enableEditMode(key)']");//editar email
            await editar3[2].click();
            await pageOtus.waitForMilliseconds(5000);
            await pageOtus.typeWithWait("input[ng-model='contactItem.value.street']", "rua 1");//principal
            await pageOtus.waitForMilliseconds(5000);
            await pageOtus.typeWithWait("input[ng-model='contactItem.value.streetNumber']", "30");//número
            await pageOtus.waitForMilliseconds(5000);
            await pageOtus.typeWithWait("input[ng-model='contactItem.value.postalCode']","92032470");//cep
            await pageOtus.waitForMilliseconds(5000);
            await pageOtus.typeWithWait("input[ng-model='contactItem.value.complements']", "quadra 2");//complemento
            await pageOtus.waitForMilliseconds(5000);
            await pageOtus.typeWithWait("input[ng-model='contactItem.value.neighbourhood']","centro");//bairro
            await pageOtus.waitForMilliseconds(5000);
            await pageOtus.typeWithWait("input[ng-model='contactItem.value.city']", "Porto Alegre");//cidade
            await pageOtus.waitForMilliseconds(5000);
            await pageOtus.typeWithWait("input[class='ng-pristine ng-untouched ng-valid md-input ng-empty']", "Meu Endereço");//Observações
            await pageOtus.waitForMilliseconds(5000);
            await pageOtus.typeWithWait("input[ng-model='contactItem.value.state']", "RS");//Estado
            await pageOtus.waitForMilliseconds(5000);
            await pageOtus.typeWithWait("input[ng-model='contactItem.value.country']", "Brasil");//País
            await pageOtus.waitForMilliseconds(5000);








        });

    })

];


