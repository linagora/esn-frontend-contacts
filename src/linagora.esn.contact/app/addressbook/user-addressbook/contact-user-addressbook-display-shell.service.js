
<<<<<<< 3ddb5c9639f826226e2e248d4cb9ebe27866a5ec
'use strict';
=======
  'use strict';
>>>>>>> #50 delete files from linagora.esn.contacts and their require

angular.module('linagora.esn.contact')
  .factory('ContactUserAddressbookDisplayShell', ContactUserAddressbookDisplayShell);

function ContactUserAddressbookDisplayShell(ContactAddressbookDisplayShell) {
  var UserAddressbookDisplayShell = function(shell) {
    this.shell = shell;
    this.icon = 'mdi-folder';
    this.displayName = shell.name || shell.bookName;
  };

  UserAddressbookDisplayShell.prototype = new ContactAddressbookDisplayShell();

<<<<<<< 3ddb5c9639f826226e2e248d4cb9ebe27866a5ec
  return UserAddressbookDisplayShell;
}
=======
    return UserAddressbookDisplayShell;
  }
  
>>>>>>> #50 delete files from linagora.esn.contacts and their require
