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