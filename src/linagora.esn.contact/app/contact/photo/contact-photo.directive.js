(function(angular) {
  'use strict';

  angular.module('linagora.esn.contact')
    .directive('contactPhoto', contactPhoto);

  function contactPhoto(
    ContactShellDisplayBuilder,
    contactService,
    CONTACT_DEFAULT_AVATAR
  ) {
    return {
      restrict: 'E',
      template: require("./contact-photo.pug"),
      scope: {
        contact: '=',
        editable: '@',
        listView: '@',
        avatarSize: '@',
        contactState: '@'
      },
      link: function(scope) {
        contactService.setContactMainEmail(scope.contact);
        scope.defaultAvatar = CONTACT_DEFAULT_AVATAR;
        scope.displayShell = ContactShellDisplayBuilder.build(scope.contact);
      }
    };
  }
})(angular);
