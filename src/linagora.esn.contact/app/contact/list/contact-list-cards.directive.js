(function(angular) {
  'use strict';

  angular.module('linagora.esn.contact')
    .directive('contactListCards', contactListCards);

  function contactListCards() {
    return {
      restrict: 'E',
      template: require("./contact-list-cards.pug")
    };
  }
})(angular);
