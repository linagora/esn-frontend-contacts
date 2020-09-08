<<<<<<< 3ddb5c9639f826226e2e248d4cb9ebe27866a5ec
'use strict';

require('../../../../esn.contact.libs/app/addressBook/addressbook-display.service.js');
=======

require('../../../../esn.contact.libs/app/addressBook/addressbook-display.service.js');

  'use strict';
>>>>>>> #50 delete files from linagora.esn.contacts and their require

angular.module('linagora.esn.contact')
  .controller('ContactAddressbookDeleteController', ContactAddressbookDeleteController);

function ContactAddressbookDeleteController(
  addressbook,
  asyncAction,
  contactAddressbookService,
  contactAddressbookDisplayService
) {
  var self = this;
  var NOTFICATION_MESSAGES = {
    progressing: 'Deleting address book...',
    success: 'Address book deleted',
    failure: 'Failed to delete address book'
  };

  self.onDeleteBtnClick = onDeleteBtnClick;
  self.addressbookDisplayShell = contactAddressbookDisplayService.convertShellToDisplayShell(addressbook);

  function onDeleteBtnClick() {
    return asyncAction(NOTFICATION_MESSAGES, _removeAddressbook);
  }

  function _removeAddressbook() {
    return contactAddressbookService.removeAddressbook(addressbook);
  }
<<<<<<< 3ddb5c9639f826226e2e248d4cb9ebe27866a5ec
}
=======
>>>>>>> #50 delete files from linagora.esn.contacts and their require
