(function(angular) {
  'use strict';

  angular.module('linagora.esn.contact')
    .component('contactAddressbookSettingsMain', {
      template: require('./contact-addressbook-settings-main.pug'),
      controller: 'contactAddressbookSettingsMainController',
      bindings: {
        addressbook: '=',
        publicRight: '=',
        membersRight: '='
      }
    });
})(angular);
