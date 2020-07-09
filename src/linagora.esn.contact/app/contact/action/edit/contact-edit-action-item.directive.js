(function(angular) {
  'use strict';

  angular.module('linagora.esn.contact')
    .directive('contactEditActionItem', function() {
      return {
        restrict: 'E',
        replace: true,
        template: require("./contact-edit-action-item.pug")
      };
    });
})(angular);
