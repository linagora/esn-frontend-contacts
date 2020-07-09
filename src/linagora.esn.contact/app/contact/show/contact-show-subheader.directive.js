(function(angular) {
  'use strict';

  angular.module('linagora.esn.contact')
    .directive('contactShowSubheader', function() {
      return {
        restrict: 'E',
        template: require("./contact-show-subheader.pug")
      };
    });
})(angular);
