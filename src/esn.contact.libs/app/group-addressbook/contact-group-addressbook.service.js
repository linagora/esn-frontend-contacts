require('../addressBook/addressbook.constants.js');

(function(angular) {
  'use strict';

  angular.module('esn.contact.libs')
    .service('contactGroupAddressbookService', contactGroupAddressbookService);

  function contactGroupAddressbookService(CONTACT_ADDRESSBOOK_TYPES) {
    return {
      isGroupAddressbook: isGroupAddressbook
    };

    function isGroupAddressbook(shell) {
      return !!shell && shell.type === CONTACT_ADDRESSBOOK_TYPES.group;
    }
  }
})(angular);
