(function(angular) {
  'use strict';

  angular.module('esn.contact.libs')
    .factory('contactAddressbookDisplayShellRegistry', contactAddressbookDisplayShellRegistry);

  function contactAddressbookDisplayShellRegistry(esnRegistry) {
    return esnRegistry('contactAddressbookDisplayShellRegistry', {
      primaryKey: 'id'
    });
  }
})(angular);
