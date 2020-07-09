(function(angular) {
  'use strict';

  angular.module('linagora.esn.contact')
    .component('contactAddressbookSettings', {
      template: require("./contact-addressbook-settings.pug"),
      controller: 'contactAddressbookSettingsController'
    });
})(angular);
