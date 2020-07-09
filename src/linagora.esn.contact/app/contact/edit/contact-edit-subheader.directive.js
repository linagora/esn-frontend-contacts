(function(angular) {
  'use strict';

  angular.module('linagora.esn.contact')
    .directive('contactEditSubheader', function() {
      return {
        restrict: 'E',
        template: require("./contact-edit-subheader.pug")
      };
    });
})(angular);
