require('../contact.service.js');
require('../shell/contact-shell-display-builder.service.js');
require('../../app.constant.js');

(function(angular) {
  'use strict';

  angular.module('linagora.esn.contact')
    .directive('contactListCard', contactListCard);

  function contactListCard(
    contactService,
    ContactShellDisplayBuilder,
    CONTACT_AVATAR_SIZE
  ) {
    return {
      restrict: 'E',
      template: require('./contact-list-card.pug'),
      scope: {
        contact: '='
      },
      controller: 'contactItemController',
      link: {
        pre: function(scope) {
          contactService.setContactMainEmail(scope.contact);
          scope.displayShell = ContactShellDisplayBuilder.build(scope.contact);
          scope.avatarSize = CONTACT_AVATAR_SIZE.cards;
        }
      }
    };
  }
})(angular);
