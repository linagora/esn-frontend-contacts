(function(angular) {
  'use strict';

  angular.module('linagora.esn.contact.import', [
    'restangular',
    'esn.session',
    'esn.notification',
    'esn.websocket',
    'esn.http'
  ]);
})(angular);

require('esn-frontend-common-libs/src/frontend/js/modules/session.js');
require('esn-frontend-common-libs/src/frontend/js/modules/notification.js');
require('esn-frontend-common-libs/src/frontend/js/modules/websocket.js');
require('esn-frontend-common-libs/src/frontend/js/modules/http.js');

require('./app.run.js');
require('./constants.js');
require('./services.js');
