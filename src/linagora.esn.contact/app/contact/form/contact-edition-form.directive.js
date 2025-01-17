
'use strict';

angular.module('linagora.esn.contact')
  .directive('contactEditionForm', contactEditionForm);

function contactEditionForm(
  $rootScope,
  $q,
  session,
  userAPI,
  userUtils,
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
        contactAddressbookService
          .listAddressbooksUserCanCreateContact()
          .then(_loadAdressbooksOwners)
          .then(addressbooks => contactAddressbookDisplayService.convertShellsToDisplayShells(
            addressbooks,
            { includePriority: true }
          ))
          .then(addressbookDisplayShells => {
            $scope.availableAddressbooks = contactAddressbookDisplayService
              .sortAddressbookDisplayShells(addressbookDisplayShells)
              .map(({ shell: { href, owner }, displayName }) => ({
                path: href,
                displayName,
                owner
              }));

            console.log($scope.availableAddressbooks);
          });
      }

      function _loadAdressbooksOwners(addressbooks) {
        const subscriptionOwnerIds = addressbooks
          .map(({ isSubscription, group, source }) => (isSubscription && !group ? source.bookId : null))
          .filter(Boolean) // remove null values
          .reduce((uniqueUserIds, userId) => (uniqueUserIds.includes(userId) ? uniqueUserIds : [...uniqueUserIds, userId]), []); // remove duplicates

        const ownerPromises = subscriptionOwnerIds.map(_fetchOwner);

        return $q.all(ownerPromises).then(owners => addressbooks.map(addressbook => {
          if (addressbook.isSubscription) {
            const owner = owners.find(({ id }) => id === addressbook.source.bookId);

            addressbook = Object.keys(owner) ? { ...addressbook, owner } : addressbook;
          }

          return addressbook;
        }));
      }

      function _fetchOwner(id) {
        return userAPI.user(id).then(({ data }) => ({ id, displayName: userUtils.displayNameOf(data) }));
      }
    }
  };
}

