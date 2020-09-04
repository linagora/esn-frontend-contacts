(function(angular) {
  'use strict';

  angular.module('linagora.esn.contact')
    .directive('contactListSubheader', function() {
      return {
        restrict: 'E',
        template: require('./contact-list-subheader.pug')
      };
    });
})(angular);
