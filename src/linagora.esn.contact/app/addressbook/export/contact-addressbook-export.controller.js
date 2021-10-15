
'use strict';

angular.module('linagora.esn.contact')
  .controller('ContactAddressbookExportController', ContactAddressbookExportController);

function ContactAddressbookExportController(
  addressbook,
  contactAddressbookDisplayService,
  contactAddressbookService
) {
  var self = this;

  self.$onInit = $onInit;

  function $onInit() {
    self.addressbookDisplayShell = contactAddressbookDisplayService.convertShellToDisplayShell(addressbook);
    self.exportAddressBook = _exportAddressBook;
  }

  function _exportAddressBook() {
    const bookId = addressbook.isSubscription ? addressbook.source.bookId : addressbook.bookId;
    const bookName = addressbook.isSubscription ? addressbook.source.bookName : addressbook.bookName;

    contactAddressbookService.exportAddressbook({ bookId, bookName });
  }
}
