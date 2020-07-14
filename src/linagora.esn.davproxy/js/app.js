(function(angular) {
  'use strict';

  angular.module('linagora.esn.davproxy', ['esn.http']);
})(angular);

require('esn-frontend-common-libs/src/frontend/js/modules/http.js');

require ('./constants.js');
require ('./services/davproxy-dav-client.service.js');
require ('./services/davproxy-principal.service.js');