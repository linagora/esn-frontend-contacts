(function(angular) {
  'use strict';

  var MODULE_NAME = 'linagora.esn.dav.import';

  angular.module(MODULE_NAME, [
    'restangular',
    'esn.file'
  ]);
})(angular);

require('esn-frontend-common-libs/src/frontend/js/modules/file.js');

require ('./common/dav-import-api-client.service.js');
require ('./common/dav-import-restangular.service.js');
require ('./import/dav-import.service.js');