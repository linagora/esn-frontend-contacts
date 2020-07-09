(function(angular) {
  'use strict';

  angular.module('linagora.esn.contact')
    .directive('contactListItem', contactListItem);

  function contactListItem(
    ContactShellDisplayBuilder,
    CONTACT_AVATAR_SIZE
  ) {
    return {
      restrict: 'E',
      template: require("./contact-list-item.pug"),
      scope: {
        contact: '=',
        avatarSize: '@',
        keySearch: '='
      },
      controller: 'contactItemController',
      link: {
        // We do translation in pre-link to execute it before the dynamic directive injection
        pre: function(scope) {
          scope.displayShell = ContactShellDisplayBuilder.build(scope.contact);
          scope.avatarSize = scope.avatarSize ? scope.avatarSize : CONTACT_AVATAR_SIZE.list;
        }
      }
    };
  }
})(angular);
