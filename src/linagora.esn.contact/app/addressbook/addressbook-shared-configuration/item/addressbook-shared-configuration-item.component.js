(function(angular) {
  'use strict';

  angular.module('linagora.esn.contact')
    .component('contactAddressbookSharedConfigurationItem', {
      bindings: {
        addressbook: '='
      },
      template: require("./addressbook-shared-configuration-item.pug"),
      controller: 'contactAddressbookSharedConfigurationItemController'
    });
})(angular);
