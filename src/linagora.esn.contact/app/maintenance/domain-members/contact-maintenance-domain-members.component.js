(function(angular) {
  'use strict';

  angular.module('linagora.esn.contact')
    .component('contactMaintenanceDomainMembers', {
      template: require("./contact-maintenance-domain-members.pug"),
      controller: 'contactMaintenanceDomainMembersController'
    });
})(angular);
