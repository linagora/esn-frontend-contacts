'use strict';

require('../../contact.service.js');

angular.module('linagora.esn.contact')
  .controller('contactActionCopyController', contactCopyController);

function contactCopyController(
  asyncAction,
  contactAddressbookDisplayService,
  contactAddressbookService,
  contactService,
  contactAddressbookHelper
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
      .then(contactAddressbookDisplayService.convertShellsToDisplayShells)
      .then(displayShells => {
        const uniqueShells = contactAddressbookHelper.getUniqueAdressBookShells(displayShells);

        self.availableAddressbookDisplayShells = _excludeCurrentAddressbookShell(uniqueShells);
        self.selectedAddressbook = self.availableAddressbookDisplayShells[0].shell;
      });
  }

  function copyContact() {

    return asyncAction(NOTIFICATION_MESSAGES, function() {
      return contactService.copyContact(self.selectedAddressbook, self.contact);
    });
  }

  function _excludeCurrentAddressbookShell(addressbookShells) {
    const { addressbook: { href } } = self.contact;

    return addressbookShells.filter(({ shell: { href: addressbookHref } }) => addressbookHref !== href);
  }
}
