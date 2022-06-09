angular.module('esnApp', [
  'ui.router',
  'esn.session',
  'esn.login',
  'esn.websocket',
  'esn.material',
  'linagora.esn.contact',
  'linagora.esn.contact.collect',
  'linagora.esn.contact.import'
]);

require('esn-frontend-common-libs/src/frontend/js/modules/session');
require('esn-frontend-common-libs/src/frontend/js/modules/websocket');
require('esn-frontend-common-libs/src/frontend/js/modules/login');
require('esn-frontend-common-libs/src/frontend/js/modules/material/material.module');

require('./app.config');
require('./app.run');
require('../linagora.esn.contact/app/app.module.js');
require('../linagora.esn.contact.collect/app/app.module.js');
require('../linagora.esn.contact.import/js/app.module.js');
