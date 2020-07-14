require('../common/dav-import-api-client.service.js');

(function(angular) {
  'use strict';

  var MODULE_NAME = 'linagora.esn.dav.import';

  angular.module(MODULE_NAME)
    .factory('davImportService', davImportService);

  function davImportService($q, fileUploadService, davImportApiClient) {
    return {
      importFromFile: importFromFile
    };

    function importFromFile(file, target) {
      return _uploadFile(file).then(function(fileId) {
        return davImportApiClient.importFromFile(fileId, target);
      });
    }

    function _uploadFile(file) {
      var deferred = $q.defer();
      var uploader = fileUploadService.get();
      var uploadTask = uploader.addFile(file, false);

      uploadTask.defer.promise.then(function(task) {
        deferred.resolve(task.response.data._id);
      }, deferred.reject, function(task) {
        deferred.notify(task.progress);
      });

      uploader.start(); // Start transferring data

      return deferred.promise;
    }
  }
})(angular);
