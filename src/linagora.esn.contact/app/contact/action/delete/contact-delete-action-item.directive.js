(function(angular) {
  'use strict';

  angular.module('linagora.esn.contact')
    .directive('contactDeleteActionItem', function() {
      return {
        restrict: 'E',
        replace: true,
        template: require('./contact-delete-action-item.pug')
      };
    });
})(angular);
