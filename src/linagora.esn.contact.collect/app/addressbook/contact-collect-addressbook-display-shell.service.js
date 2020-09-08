'use strict';

angular.module('linagora.esn.contact.collect')
  .factory('ContactCollectAddressbookDisplayShell', function(
    ContactAddressbookDisplayShell,
    esnI18nService
  ) {
    const CollectAddressbookDisplayShell = function(shell) {
      this.shell = shell;
      this.icon = 'mdi-archive';
      this.displayName = shell.name || esnI18nService.translate('Collected contacts').toString();
    };

    CollectAddressbookDisplayShell.prototype = new ContactAddressbookDisplayShell();

    return CollectAddressbookDisplayShell;
  });
