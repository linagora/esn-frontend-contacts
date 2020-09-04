(function(angular) {
  'use strict';

  angular.module('linagora.esn.contact')
    .component('contactSidebar', {
      template: require('./sidebar.pug'),
      controller: 'ContactSidebarController'
    });
})(angular);
