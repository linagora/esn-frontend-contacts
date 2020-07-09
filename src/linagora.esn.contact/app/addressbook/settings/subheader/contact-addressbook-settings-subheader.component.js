(function(angular) {
  'use strict';

  angular.module('linagora.esn.contact')
    .component('contactAddressbookSettingsSubheader', {
      template: require("./contact-addressbook-settings-subheader.pug"),
      bindings: {
        name: '<',
        onSubmit: '&',
        onCancel: '&',
        form: '<'
      }
    });
})(angular);
