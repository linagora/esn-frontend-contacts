(function(angular) {
  'use strict';

  angular.module('linagora.esn.contact')
    .component('contactSidebarAddressbooksList', {
      template: require("./contact-sidebar-addressbooks-list.pug"),
      bindings: {
        addressbooks: '=',
        section: '<'
      }
    });
})(angular);
