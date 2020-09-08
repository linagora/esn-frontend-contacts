
<<<<<<< 3ddb5c9639f826226e2e248d4cb9ebe27866a5ec
'use strict';
=======
  'use strict';
>>>>>>> #50 delete files from linagora.esn.contacts and their require

angular.module('linagora.esn.contact')
  .directive('contactEditionForm', contactEditionForm);

function contactEditionForm(
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
      contactState: '@'
    },
    template: require('./contact-edition-form.pug'),
    link: function($scope) {
      $scope.CONTACT_ATTRIBUTES_ORDER = CONTACT_ATTRIBUTES_ORDER;
      $scope.avatarSize = CONTACT_AVATAR_SIZE.bigger;

<<<<<<< 3ddb5c9639f826226e2e248d4cb9ebe27866a5ec
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
  };
}
=======
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
    };
  }
  
>>>>>>> #50 delete files from linagora.esn.contacts and their require
