'use strict';

angular.module('linagora.esn.contact.collect', [
  'linagora.esn.contact'
]);

require('../../linagora.esn.contact/app/app.module');
require('./app.run');
require('./addressbook/contact-collect-addressbook.service');
require('./addressbook/contact-collect-addressbook-display-shell.service');
