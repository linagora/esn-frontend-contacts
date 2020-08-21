'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;

describe('The davImportService service', function() {
  var $rootScope;
  var fileUploadService;
  var davImportService, davImportApiClient;

  beforeEach(angular.mock.module('linagora.esn.dav.import'));

  beforeEach(angular.mock.inject(function(_$rootScope_, _fileUploadService_, _davImportService_, _davImportApiClient_) {
    $rootScope = _$rootScope_;
    fileUploadService = _fileUploadService_;
    davImportService = _davImportService_;
    davImportApiClient = _davImportApiClient_;
  }));

  describe('The importFromFile fn', function() {
    it('should upload file then import it', function() {
      var uploadTaskDefer = $q.defer();
      var uploadTask = {
        defer: uploadTaskDefer
      };
      var uploader = {
        addFile: sinon.stub().returns(uploadTask),
        start: sinon.spy()
      };

      fileUploadService.get = sinon.stub().returns(uploader);
      davImportApiClient.importFromFile = sinon.spy();

      var file = { name: 'contacts.vcf' };
      var target = '/addressbooks/bookHome/bookId.json';

      davImportService.importFromFile(file, target);
      $rootScope.$digest();

      expect(uploader.addFile).to.have.been.calledWith(file, false);
      expect(uploader.start).to.have.been.calledWith();

      var fileId = '12345';

      uploadTaskDefer.resolve({
        response: { data: { _id: fileId } }
      });
      $rootScope.$digest();

      expect(davImportApiClient.importFromFile).to.have.been.calledWith(fileId, target);
    });
  });

});
