
'use strict';

angular.module('linagora.esn.contact')
  .directive('contactEditionForm', contactEditionForm);

function contactEditionForm(
  $rootScope,
  session,
  contactAddressbookDisplayService,
  contactAddressbookService,
  CONTACT_ATTRIBUTES_ORDER,
  CONTACT_AVATAR_SIZE
) {
  return {
    restrict: 'E',
    scope: {
      contact: '=',
      addressbookPath: '=',
      contactState: '@',
      accept: '&',
      close: '&'
    },
    template: require('./contact-edition-form.pug'),
    link: function($scope) {
      $scope.CONTACT_ATTRIBUTES_ORDER = CONTACT_ATTRIBUTES_ORDER;
      $scope.avatarSize = CONTACT_AVATAR_SIZE.bigger;

      if (session.user._id) return _fetchAvailableAddressBooks();

      $rootScope.$on('$stateChangeSuccess', () => {
        _fetchAvailableAddressBooks();
      });

      function _fetchAvailableAddressBooks() {
        contactAddressbookService.listAddressbooksUserCanCreateContact().then(function(addressbooks) {
          return contactAddressbookDisplayService.convertShellsToDisplayShells(addressbooks, { includePriority: true });
        })
          .then(function(addressbookDisplayShells) {
            $scope.availableAddressbooks = contactAddressbookDisplayService.sortAddressbookDisplayShells(addressbookDisplayShells)
              .map(function(addressbookDisplayShell) {
                return {
                  path: addressbookDisplayShell.shell.href,
                  displayName: addressbookDisplayShell.displayName
                };
              });
          });
      }
    }
  };
}

