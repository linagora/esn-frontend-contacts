require('../virtual-addressbook-registry.service.js');
require('./following-virtual-addressbook.service.js');
require('../../../contact/shell/display-shell-provider.service.js');
require('../user/shells/user-display-shell.js');
require('../user/shells/user-shell-helper.service.js');
require('../../display-shell/addressbook-display-shell-registry.service.js');
require('../user/user-virtual-addressbook-displayshell.service.js');
require('./following-virtual-addressbook.constant.js');
require('../../../services/contact-configuration.service.js');

(function(angular) {
  'use strict';

  angular.module('linagora.esn.contact').run(runBlock);

  function runBlock(
    ContactVirtualAddressBookRegistry,
    ContactFollowingVirtualAddressBook,
    DisplayShellProvider,
    ContactUserDisplayShell,
    ContactUserShellHelper,
    contactAddressbookDisplayShellRegistry,
    ContactUserVirtualAddressBookDisplayShell,
    CONTACT_FOLLOWING_VIRTUAL_ADDRESSBOOK_ID,
    contactConfiguration
  ) {
    contactConfiguration.get('enabled', true).then(function(isEnabled) {
      if (!isEnabled) {
        return;
      }
      ContactVirtualAddressBookRegistry.put(ContactFollowingVirtualAddressBook);
      DisplayShellProvider.addDisplayShell(ContactUserDisplayShell, ContactUserShellHelper.isUser);
      contactAddressbookDisplayShellRegistry.add({
        id: CONTACT_FOLLOWING_VIRTUAL_ADDRESSBOOK_ID,
        priority: 30,
        displayShell: ContactUserVirtualAddressBookDisplayShell,
        matchingFunction: ContactUserShellHelper.isAddressbook
      });
    });
  }
})(angular);
