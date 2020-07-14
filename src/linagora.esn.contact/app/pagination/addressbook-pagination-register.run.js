require('./addressbook-pagination-registry.service.js');
require('./addressbook-pagination-provider.service.js');
require('./search-addressbook-pagination-provider.service.js');
require('./multiple-addressbook-pagination-provider.service.js');
require('../app.constant.js');
require('../services/contact-configuration.service.js');

(function(angular) {
  'use strict';

  angular.module('linagora.esn.contact')
    .run(registerAddressbookPaginationModes);

  function registerAddressbookPaginationModes(
    AddressBookPaginationRegistry,
    AddressBookPaginationProvider,
    SearchAddressBookPaginationProvider,
    MultipleAddressBookPaginationProvider,
    CONTACT_LIST_DISPLAY_MODES,
    contactConfiguration
  ) {
    contactConfiguration.get('enabled', true).then(function(isEnabled) {
      if (!isEnabled) {
        return;
      }
      AddressBookPaginationRegistry.put(CONTACT_LIST_DISPLAY_MODES.single, AddressBookPaginationProvider);
      AddressBookPaginationRegistry.put(CONTACT_LIST_DISPLAY_MODES.search, SearchAddressBookPaginationProvider);
      AddressBookPaginationRegistry.put(CONTACT_LIST_DISPLAY_MODES.multiple, MultipleAddressBookPaginationProvider);
    });
  }
})(angular);
