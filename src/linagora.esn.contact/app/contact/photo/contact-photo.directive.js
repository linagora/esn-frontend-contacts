require('../shell/contact-shell-display-builder.service.js');
require('../contact.service.js');
require('../../app.constant.js');

(function(angular) {
  'use strict';

  angular.module('linagora.esn.contact')
    .directive('contactPhoto', contactPhoto);

  function contactPhoto(
    ContactShellDisplayBuilder,
    contactService,
    ContactAPIClient,
    CONTACT_DEFAULT_AVATAR
  ) {
    return {
      restrict: 'E',
      template: require('./contact-photo.pug'),
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

        const payload = {
          addressBookId: scope.contact.addressbook.bookId,
          addressbookName: scope.contact.addressbook.bookName,
          contactId: scope.contact.id
        };

        contactService.getContactAvatar(payload).then(contactAvatar => {
          scope.contact.photo = contactAvatar;
        });
      }
    };
  }
})(angular);
