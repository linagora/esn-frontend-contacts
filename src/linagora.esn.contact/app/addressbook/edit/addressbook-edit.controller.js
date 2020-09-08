
<<<<<<< 3ddb5c9639f826226e2e248d4cb9ebe27866a5ec
'use strict';
=======
  'use strict';
>>>>>>> #50 delete files from linagora.esn.contacts and their require

angular.module('linagora.esn.contact')
  .controller('ContactAddressbookEditController', ContactAddressbookEditController);

function ContactAddressbookEditController(
  addressbook,
  asyncAction,
  contactAddressbookService
) {
  var self = this;
  var NOTFICATION_MESSAGES = {
    progressing: 'Updating address book...',
    success: 'Address book updated',
    failure: 'Failed to update address book'
  };

  self.addressbook = addressbook;
  self.onSaveBtnClick = onSaveBtnClick;

  function onSaveBtnClick() {
    return asyncAction(NOTFICATION_MESSAGES, _updateAddressbook);
  }

  function _updateAddressbook() {
    return contactAddressbookService.updateAddressbook(self.addressbook);
  }
<<<<<<< 3ddb5c9639f826226e2e248d4cb9ebe27866a5ec
}
=======
  
>>>>>>> #50 delete files from linagora.esn.contacts and their require
