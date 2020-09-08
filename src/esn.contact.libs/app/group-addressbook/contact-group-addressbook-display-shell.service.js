'use strict';

require('../display-shell/addressbook-display-shell.service.js');

angular.module('esn.contact.libs')
  .factory('ContactGroupAddressbookDisplayShell', ContactGroupAddressbookDisplayShell);

function ContactGroupAddressbookDisplayShell(esnI18nService, ContactAddressbookDisplayShell) {
  var GroupAddressbookDisplayShell = function(shell) {
    this.shell = shell;
    this.icon = 'mdi-book-multiple';

    this.displayName = shell.name && esnI18nService.translate(shell.name).toString() || shell.bookName;
  };

  GroupAddressbookDisplayShell.prototype = new ContactAddressbookDisplayShell();

  return GroupAddressbookDisplayShell;
}
