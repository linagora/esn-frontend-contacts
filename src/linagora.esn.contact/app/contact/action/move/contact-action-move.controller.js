'use strict';

const _ = require('lodash');

require('../../contact.service.js');

<<<<<<< 3ddb5c9639f826226e2e248d4cb9ebe27866a5ec
angular.module('linagora.esn.contact')
  .controller('contactActionMoveController', contactActionMoveController);

function contactActionMoveController(
  asyncAction,
  contactAddressbookDisplayService,
  contactAddressbookService,
  contactService
) {
  var self = this;
  var NOTIFICATION_MESSAGES = {
    progressing: 'Moving contact...',
    success: 'Contact moved',
    failure: 'Failed to move contact'
  };

  self.listPossbileDestinations = listPossbileDestinations;
  self.moveContact = moveContact;

  function listPossbileDestinations() {
    contactAddressbookService.listAddressbooksUserCanCreateContact()
      .then(_excludeCurrentAddressbook)
      .then(contactAddressbookDisplayService.convertShellsToDisplayShells)
      .then(function(availableAddressbookDisplayShells) {
        self.availableAddressbookDisplayShells = availableAddressbookDisplayShells;
        self.selectedAddressbook = self.availableAddressbookDisplayShells[0].shell;
=======

  angular.module('linagora.esn.contact')
    .controller('contactActionMoveController', contactActionMoveController);

  function contactActionMoveController(
    asyncAction,
    contactAddressbookDisplayService,
    contactAddressbookService,
    contactService
  ) {
    var self = this;
    var NOTIFICATION_MESSAGES = {
      progressing: 'Moving contact...',
      success: 'Contact moved',
      failure: 'Failed to move contact'
    };

    self.listPossbileDestinations = listPossbileDestinations;
    self.moveContact = moveContact;

    function listPossbileDestinations() {
      contactAddressbookService.listAddressbooksUserCanCreateContact()
        .then(_excludeCurrentAddressbook)
        .then(contactAddressbookDisplayService.convertShellsToDisplayShells)
        .then(function(availableAddressbookDisplayShells) {
          self.availableAddressbookDisplayShells = availableAddressbookDisplayShells;
          self.selectedAddressbook = self.availableAddressbookDisplayShells[0].shell;
        });
    }

    function moveContact() {
      return asyncAction(NOTIFICATION_MESSAGES, function() {
        return contactService.moveContact(self.contact.addressbook, self.selectedAddressbook, self.contact);
>>>>>>> #50 delete files from linagora.esn.contacts and their require
      });
  }

  function moveContact() {
    return asyncAction(NOTIFICATION_MESSAGES, function() {
      return contactService.moveContact(self.contact.addressbook, self.selectedAddressbook, self.contact);
    });
  }

  function _excludeCurrentAddressbook(addressbooks) {
    _.remove(addressbooks, function(addressbook) {
      return self.contact.addressbook.bookName === addressbook.bookName;
    });

    return addressbooks;
  }
<<<<<<< 3ddb5c9639f826226e2e248d4cb9ebe27866a5ec
}
=======
>>>>>>> #50 delete files from linagora.esn.contacts and their require
