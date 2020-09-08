'use strict';

const _ = require('lodash');

require('../../contact.service.js');

<<<<<<< 3ddb5c9639f826226e2e248d4cb9ebe27866a5ec
angular.module('linagora.esn.contact')
  .controller('contactActionCopyController', contactCopyController);

function contactCopyController(
  asyncAction,
  contactAddressbookDisplayService,
  contactAddressbookService,
  contactService
) {
  var self = this;
  var NOTIFICATION_MESSAGES = {
    progressing: 'Copying contact...',
    success: 'Contact copied',
    failure: 'Failed to copy contact'
  };

  self.listPossibleDestinations = listPossibleDestinations;
  self.copyContact = copyContact;

  function listPossibleDestinations() {
    contactAddressbookService.listAddressbooksUserCanCreateContact()
      .then(_excludeCurrentAddressbook)
      .then(contactAddressbookDisplayService.convertShellsToDisplayShells)
      .then(function(availableAddressbookDisplayShells) {
        self.availableAddressbookDisplayShells = availableAddressbookDisplayShells;
        self.selectedAddressbook = self.availableAddressbookDisplayShells[0].shell;
      });
  }

  function copyContact() {
    return asyncAction(NOTIFICATION_MESSAGES, function() {
=======

angular.module('linagora.esn.contact')
  .controller('contactActionCopyController', contactCopyController);

function contactCopyController(
  asyncAction,
  contactAddressbookDisplayService,
  contactAddressbookService,
  contactService
) {
  var self = this;
  var NOTIFICATION_MESSAGES = {
    progressing: 'Copying contact...',
    success: 'Contact copied',
    failure: 'Failed to copy contact'
  };

  self.listPossibleDestinations = listPossibleDestinations;
  self.copyContact = copyContact;

  function listPossibleDestinations() {
    contactAddressbookService.listAddressbooksUserCanCreateContact()
      .then(_excludeCurrentAddressbook)
      .then(contactAddressbookDisplayService.convertShellsToDisplayShells)
      .then(function (availableAddressbookDisplayShells) {
        self.availableAddressbookDisplayShells = availableAddressbookDisplayShells;
        self.selectedAddressbook = self.availableAddressbookDisplayShells[0].shell;
      });
  }

  function copyContact() {
    return asyncAction(NOTIFICATION_MESSAGES, function () {
>>>>>>> #50 delete files from linagora.esn.contacts and their require
      return contactService.copyContact(self.selectedAddressbook, self.contact);
    });
  }

  function _excludeCurrentAddressbook(addressbooks) {
<<<<<<< 3ddb5c9639f826226e2e248d4cb9ebe27866a5ec
    _.remove(addressbooks, function(addressbook) {
=======
    _.remove(addressbooks, function (addressbook) {
>>>>>>> #50 delete files from linagora.esn.contacts and their require
      return self.contact.addressbook.bookName === addressbook.bookName;
    });

    return addressbooks;
  }
<<<<<<< 3ddb5c9639f826226e2e248d4cb9ebe27866a5ec
}
=======
}
>>>>>>> #50 delete files from linagora.esn.contacts and their require
