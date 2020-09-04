(function(angular) {
  'use strict';

  angular.module('linagora.esn.contact')
    .component('contactConfigDomainAddressbook', {
      template: require('./contact-config-domain-addressbook.pug'),
      controller: 'ContactConfigDomainAddressbookController',
      require: {
        adminModulesDisplayerController: '^^adminModulesDisplayer'
      }
    });
})(angular);
