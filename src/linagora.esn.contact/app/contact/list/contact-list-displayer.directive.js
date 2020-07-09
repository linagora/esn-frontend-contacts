(function(angular) {
  'use strict';

  angular.module('linagora.esn.contact')
    .directive('contactListDisplayer', contactListDisplayer);

  function contactListDisplayer(
    $rootScope,
    ContactListToggleDisplayService,
    ContactListToggleEventService
  ) {
    return {
      restrict: 'E',
      template: require("./contact-list-displayer.pug"),
      link: function($scope) {

        $scope.displayAs = ContactListToggleDisplayService.getCurrentDisplay();

        ContactListToggleEventService.listen($scope, function(evt, value) {
          $scope.displayAs = value;
        });

        $scope.$on('$locationChangeStart', function() {
          ContactListToggleDisplayService.setCurrentDisplay($scope.displayAs);
        });

      }
    };
  }
})(angular);
