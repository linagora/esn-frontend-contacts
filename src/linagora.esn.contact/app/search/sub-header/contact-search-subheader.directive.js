(function(angular) {
  'use strict';

  angular.module('linagora.esn.contact').directive('contactSearchSubheader', function() {
    return {
      restrict: 'E',
      template: require("./contact-search-subheader.pug")
    };
  });
})(angular);
