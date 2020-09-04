require('../display-shell/addressbook-display-shell-registry.service.js');
require('./default-addressbook-display-shell.service.js');
require('./default-addressbook-helper.service.js');
require('../action/addressbook-action-edit.service.js');
require('../action/addressbook-action-delete.service.js');
require('../action/addressbook-action-settings.service.js');
require('../action/addressbook-action-export.service.js');
require('../../services/contact-configuration.service.js');

'use strict';

angular.module('linagora.esn.contact')
  .run(registerDefaultAddressbookDisplayShell);

function registerDefaultAddressbookDisplayShell(
  contactAddressbookDisplayShellRegistry,
  ContactDefaultAddressbookDisplayShell,
  contactDefaultAddressbookHelper,
  contactAddressbookActionEdit,
  contactAddressbookActionDelete,
  contactAddressbookActionSettings,
  contactAddressbookActionExport,
  contactConfiguration
) {
  contactConfiguration.get('enabled', true).then(function(isEnabled) {
    if (!isEnabled) {
      return;
    }
    contactAddressbookDisplayShellRegistry.add({
      id: 'linagora.esn.contact',
      priority: 1,
      actions: [
        contactAddressbookActionExport,
        contactAddressbookActionSettings,
        contactAddressbookActionEdit,
        contactAddressbookActionDelete
      ],
      displayShell: ContactDefaultAddressbookDisplayShell,
      matchingFunction: contactDefaultAddressbookHelper.isDefaultAddressbook
    });
  });
}
