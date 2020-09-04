(function(angular) {
  'use strict';

  angular.module('linagora.esn.contact')
    .component('contactSidebarAddressbookItem', {
      template: require('./contact-sidebar-addressbook-item.pug'),
      controller: 'ContactSidebarAddressbookItemController',
      bindings: {
        addressbookDisplayShell: '<'
      }
    });
})(angular);
