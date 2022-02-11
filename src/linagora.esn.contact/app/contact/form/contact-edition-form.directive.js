
'use strict';

angular.module('linagora.esn.contact')
  .directive('contactEditionForm', contactEditionForm);

function contactEditionForm(
  contactAddressbookDisplayService,
  contactAddressbookService,
  contactAddressbookHelper,
  CONTACT_ATTRIBUTES_ORDER,
  CONTACT_AVATAR_SIZE
) {
  return {
    restrict: 'E',
    scope: {
      contact: '=',
      addressbookPath: '=',
      contactState: '@'
    },
    template: require('./contact-edition-form.pug'),
    link: function($scope) {
      $scope.CONTACT_ATTRIBUTES_ORDER = CONTACT_ATTRIBUTES_ORDER;
      $scope.avatarSize = CONTACT_AVATAR_SIZE.bigger;

      contactAddressbookService.listAddressbooksUserCanCreateContact()
        .then(addressbooks => contactAddressbookDisplayService.convertShellsToDisplayShells(addressbooks, { includePriority: true }))
        .then(displayShells => {
          const uniqueAddressBookShells = contactAddressbookHelper.getUniqueAdressBookShells(displayShells);

          $scope.availableAddressbooks = contactAddressbookDisplayService.sortAddressbookDisplayShells(uniqueAddressBookShells)
            .map(displayShell => ({
              path: displayShell.shell.href,
              displayName: displayShell.displayName
            }));
        });
    }
  };
}

