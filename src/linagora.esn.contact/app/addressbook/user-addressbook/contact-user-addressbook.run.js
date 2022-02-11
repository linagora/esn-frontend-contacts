require('../action/addressbook-action-export.service.js');
require('../action/addressbook-action-settings.service.js');
require('./contact-user-addressbook.service.js');
require('./contact-user-addressbook-display-shell.service.js');
require('../../services/contact-configuration.service.js');

'use strict';

angular.module('linagora.esn.contact')
  .run(function(
    contactAddressbookActionExport,
    contactAddressbookActionSettings,
    contactAddressbookDisplayShellRegistry,
    contactUserAddressbookService,
    ContactUserAddressbookDisplayShell,
    contactConfiguration
  ) {
    contactConfiguration.get('enabled', true).then(function(isEnabled) {
      if (!isEnabled) {
        return;
      }
      contactAddressbookDisplayShellRegistry.add({
        id: 'linagora.esn.contact.user-addressbook',
        priority: 100,
        actions: [
          contactAddressbookActionExport,
          contactAddressbookActionSettings
        ],
        displayShell: ContactUserAddressbookDisplayShell,
        matchingFunction: contactUserAddressbookService.isUserAddressbook
      });
    });
  });
