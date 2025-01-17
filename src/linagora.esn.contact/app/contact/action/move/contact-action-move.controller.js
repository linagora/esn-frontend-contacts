'use strict';

require('../../contact.service.js');

angular.module('linagora.esn.contact')
  .controller('contactActionMoveController', contactActionMoveController);

function contactActionMoveController(
  asyncAction,
  contactAddressbookDisplayService,
  contactAddressbookService,
  contactService,
  contactAddressbookHelper
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
      .then(contactAddressbookDisplayService.convertShellsToDisplayShells)
      .then(displayShells => {
        const uniqueShells = contactAddressbookHelper.getUniqueAdressBookShells(displayShells);

        self.availableAddressbookDisplayShells = _excludeCurrentAddressbookShell(uniqueShells);
        self.selectedAddressbook = self.availableAddressbookDisplayShells[0].shell;
      });
  }

  function moveContact() {
    return asyncAction(NOTIFICATION_MESSAGES, function() {
      return contactService.moveContact(self.contact.addressbook, self.selectedAddressbook, self.contact);
    });
  }

  function _excludeCurrentAddressbookShell(addressbookShells) {
    const { addressbook: { href } } = self.contact;

    return addressbookShells.filter(({ shell: { href: addressbookHref } }) => addressbookHref !== href);
  }
}

