(function(angular) {
  'use strict';

  angular.module('linagora.esn.contact')
    .directive('contactCreateSubheader', function() {
      return {
        restrict: 'E',
        template: require("./contact-create-subheader.pug")
      };
    });
})(angular);
