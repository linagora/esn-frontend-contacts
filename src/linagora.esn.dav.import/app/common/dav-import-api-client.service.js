(function(angular) {
  'use strict';

  var MODULE_NAME = 'linagora.esn.dav.import';
  var API_PATH = 'import';

  angular.module(MODULE_NAME)
    .factory('davImportApiClient', davImportApiClient);

  function davImportApiClient(davImportRestangular) {
    return {
      importFromFile: importFromFile
    };

    function importFromFile(fileId, target) {
      return davImportRestangular.all(API_PATH).customPOST({ fileId: fileId, target: target });
    }
  }
})(angular);
