(function(angular) {
  'use strict';

  angular.module('linagora.esn.contact')
    .component('contactConfigForm', {
      template: require("./contact-config-form.pug"),
      bindings: {
        configurations: '=',
        mode: '@',
        availableModes: '<'
      }
    });
})(angular);
