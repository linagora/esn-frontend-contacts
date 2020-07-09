(function(angular) {
  'use strict';

  angular.module('linagora.esn.contact')
    .component('contactAddressbookSettingsDelegation', {
      template: require("./contact-addressbook-settings-delegation.pug"),
      controller: 'contactAddressbookSettingsDelegationController',
      bindings: {
        sharees: '=',
        shareManagers: '<'
      }
    });
})(angular);
