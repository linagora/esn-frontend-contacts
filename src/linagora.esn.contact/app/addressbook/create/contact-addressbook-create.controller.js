<<<<<<< 3ddb5c9639f826226e2e248d4cb9ebe27866a5ec
'use strict';

angular.module('linagora.esn.contact')
  .controller('ContactAddressbookCreateController', ContactAddressbookCreateController);
=======

  'use strict';
>>>>>>> #50 delete files from linagora.esn.contacts and their require

function ContactAddressbookCreateController(asyncAction, contactAddressbookService) {
  var self = this;
  var notificationMessages = {
    progressing: 'Creating address book...',
    success: 'Address book created',
    failure: 'Failed to create address book'
  };

  self.onCreateBtnClick = onCreateBtnClick;

  function onCreateBtnClick() {
    return asyncAction(notificationMessages, function() {
      return contactAddressbookService.createAddressbook(self.addressbook);
    });
  }
<<<<<<< 3ddb5c9639f826226e2e248d4cb9ebe27866a5ec
}
=======
>>>>>>> #50 delete files from linagora.esn.contacts and their require
