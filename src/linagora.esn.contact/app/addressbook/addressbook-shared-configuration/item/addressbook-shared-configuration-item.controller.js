<<<<<<< 3ddb5c9639f826226e2e248d4cb9ebe27866a5ec
'use strict';

require('../../../sharing/constants.js');
=======
require('../../../sharing/constants.js');

  'use strict';
>>>>>>> #50 delete files from linagora.esn.contacts and their require

angular.module('linagora.esn.contact')
  .controller('contactAddressbookSharedConfigurationItemController', contactAddressbookSharedConfigurationItemController);

function contactAddressbookSharedConfigurationItemController(
  contactAddressbookDisplayService,
  CONTACT_SHARING_SUBSCRIPTION_TYPE
) {
  var self = this;

  self.$onInit = $onInit;

  function $onInit() {
    if (self.addressbook.subscriptionType === CONTACT_SHARING_SUBSCRIPTION_TYPE.delegation) {
      self.addressbookDisplayName = contactAddressbookDisplayService.buildDisplayName(self.addressbook.source);
    } else {
      self.addressbookDisplayName = contactAddressbookDisplayService.buildDisplayName(self.addressbook);
    }
  }
<<<<<<< 3ddb5c9639f826226e2e248d4cb9ebe27866a5ec
}
=======
>>>>>>> #50 delete files from linagora.esn.contacts and their require
