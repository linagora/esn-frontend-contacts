'use strict';

const _ = require('lodash');

angular.module('linagora.esn.contact')
  .controller('ContactSidebarController', ContactSidebarController);

function ContactSidebarController(
  $scope,
  $q,
  userAPI,
  userUtils,
  contactAddressbookDisplayService,
  contactAddressbookService,
  CONTACT_ADDRESSBOOK_EVENTS
) {
  var self = this;
  var LOADING_STATUS = {
    loading: 'loading',
    loaded: 'loaded',
    error: 'error'
  };
  var DISPLAY_SHELL_CONVERT_OPTIONS = {
    includeActions: true,
    includePriority: true
  };

  self.$onInit = $onInit;
  self.reload = reload;

  function $onInit() {
    self.status = LOADING_STATUS.loading;

    contactAddressbookService.listAddressbooks()
<<<<<<< 3ddb5c9639f826226e2e248d4cb9ebe27866a5ec
      .then(function(addressbooks) {
=======
      .then(function (addressbooks) {
>>>>>>> #50 delete files from linagora.esn.contacts and their require
        self.status = LOADING_STATUS.loaded;

        return _injectOwnerToSubscription(addressbooks);
      })
<<<<<<< 3ddb5c9639f826226e2e248d4cb9ebe27866a5ec
      .then(function(addressbooks) {
        contactAddressbookDisplayService.convertShellsToDisplayShells(addressbooks, DISPLAY_SHELL_CONVERT_OPTIONS).then(function(displayShells) {
=======
      .then(function (addressbooks) {
        contactAddressbookDisplayService.convertShellsToDisplayShells(addressbooks, DISPLAY_SHELL_CONVERT_OPTIONS).then(function (displayShells) {
>>>>>>> #50 delete files from linagora.esn.contacts and their require
          self.displayShells = displayShells;
          _refreshAddressbooksList();
          _listenAddressbookEvents();
        });
      })
<<<<<<< 3ddb5c9639f826226e2e248d4cb9ebe27866a5ec
      .catch(function() {
=======
      .catch(function () {
>>>>>>> #50 delete files from linagora.esn.contacts and their require
        self.status = LOADING_STATUS.error;
      });
  }

  function reload() {
    $onInit();
  }

  function _listenAddressbookEvents() {
    $scope.$on(CONTACT_ADDRESSBOOK_EVENTS.CREATED, _onAddressbookCreatedEvent);
    $scope.$on(CONTACT_ADDRESSBOOK_EVENTS.UPDATED, _onUpdatedAddressbookEvent);
    $scope.$on(CONTACT_ADDRESSBOOK_EVENTS.DELETED, _onRemovedAddressbookEvent);
    $scope.$on(CONTACT_ADDRESSBOOK_EVENTS.SUBSCRIPTION_DELETED, _onRemovedAddressbookEvent);
  }

  function _injectOwnerToSubscription(addressbooks) {
    var userIds = [];

<<<<<<< 3ddb5c9639f826226e2e248d4cb9ebe27866a5ec
    addressbooks.forEach(function(addressbook) {
=======
    addressbooks.forEach(function (addressbook) {
>>>>>>> #50 delete files from linagora.esn.contacts and their require
      if (addressbook.isSubscription && !addressbook.group) {
        userIds.push(addressbook.source.bookId);
      }
    });

<<<<<<< 3ddb5c9639f826226e2e248d4cb9ebe27866a5ec
    var getOwnersPromises = _.unique(userIds).map(function(userId) {
      return userAPI.user(userId).then(function(response) {
=======
    var getOwnersPromises = _.unique(userIds).map(function (userId) {
      return userAPI.user(userId).then(function (response) {
>>>>>>> #50 delete files from linagora.esn.contacts and their require
        return {
          id: userId,
          displayName: userUtils.displayNameOf(response.data)
        };
      });
    });

<<<<<<< 3ddb5c9639f826226e2e248d4cb9ebe27866a5ec
    return $q.all(getOwnersPromises).then(function(owners) {
      addressbooks.forEach(function(addressbook) {
        if (addressbook.isSubscription) {
          var target = _.find(owners, function(owner) {
=======
    return $q.all(getOwnersPromises).then(function (owners) {
      addressbooks.forEach(function (addressbook) {
        if (addressbook.isSubscription) {
          var target = _.find(owners, function (owner) {
>>>>>>> #50 delete files from linagora.esn.contacts and their require
            return addressbook.source.bookId === owner.id;
          });

          if (target) {
            addressbook.owner = target;
          }
        }
      });

      return addressbooks;
    });
  }

  function _onAddressbookCreatedEvent(event, createdAddressbook) {
    if (createdAddressbook.isSubscription) {
      return _injectOwnerToSubscription([createdAddressbook])
<<<<<<< 3ddb5c9639f826226e2e248d4cb9ebe27866a5ec
        .then(function() {
=======
        .then(function () {
>>>>>>> #50 delete files from linagora.esn.contacts and their require
          self.displayShells.push(contactAddressbookDisplayService.convertShellToDisplayShell(createdAddressbook, DISPLAY_SHELL_CONVERT_OPTIONS));
        })
        .then(_refreshAddressbooksList);
    }

    self.displayShells.push(contactAddressbookDisplayService.convertShellToDisplayShell(createdAddressbook, DISPLAY_SHELL_CONVERT_OPTIONS));
    _refreshAddressbooksList();
  }

  function _onUpdatedAddressbookEvent(event, updatedAddressbook) {
    if (updatedAddressbook.isSubscription) {
      return _injectOwnerToSubscription([updatedAddressbook])
<<<<<<< 3ddb5c9639f826226e2e248d4cb9ebe27866a5ec
        .then(function(injectedOwnerAddressbooks) {
=======
        .then(function (injectedOwnerAddressbooks) {
>>>>>>> #50 delete files from linagora.esn.contacts and their require
          _updateAddressbookInList(injectedOwnerAddressbooks[0]);
          _refreshAddressbooksList();
        });
    }

    _updateAddressbookInList(updatedAddressbook);
    _refreshAddressbooksList();
  }

  function _updateAddressbookInList(addressbookToUpdate) {
<<<<<<< 3ddb5c9639f826226e2e248d4cb9ebe27866a5ec
    var index = _.findIndex(self.displayShells, function(addressbook) {
=======
    var index = _.findIndex(self.displayShells, function (addressbook) {
>>>>>>> #50 delete files from linagora.esn.contacts and their require
      return addressbook.shell.bookName === addressbookToUpdate.bookName;
    });

    if (index !== -1) {
      self.displayShells[index].shell = addressbookToUpdate;
      self.displayShells[index].displayName = addressbookToUpdate.name;
    }
  }

  function _onRemovedAddressbookEvent(event, removedAddressbook) {
<<<<<<< 3ddb5c9639f826226e2e248d4cb9ebe27866a5ec
    _.remove(self.displayShells, function(addressbook) {
=======
    _.remove(self.displayShells, function (addressbook) {
>>>>>>> #50 delete files from linagora.esn.contacts and their require
      return addressbook.shell.bookName === removedAddressbook.bookName;
    });

    _refreshAddressbooksList();
  }

  function _refreshAddressbooksList() {
    var categories = contactAddressbookDisplayService.categorizeDisplayShells(self.displayShells);

    self.userAddressbooks = categories.userAddressbooks;
    self.sharedAddressbooks = categories.sharedAddressbooks;
    self.virtualAddressbooks = categories.virtualAddressbooks;
  }
}
