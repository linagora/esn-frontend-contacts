angular.module('esnApp', [
  'ui.router',
  'esn.session',
  'esn.login',
  'esn.websocket',
  'linagora.esn.contact',
  'linagora.esn.contact.import',
  'linagora.esn.davproxy'
]);

require('esn-frontend-common-libs/src/frontend/js/modules/session');
require('esn-frontend-common-libs/src/frontend/js/modules/websocket');
require('esn-frontend-common-libs/src/frontend/js/modules/login');

require('./app.config');
require('./app.run');
require('../linagora.esn.contact/app/app.module.js');
require('../linagora.esn.contact.import/js/app.module.js');
require('../linagora.esn.davproxy/js/app.js');
