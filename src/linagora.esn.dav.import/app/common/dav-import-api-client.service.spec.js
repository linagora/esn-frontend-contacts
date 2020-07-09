'use strict';

describe('The davImportApiClient service', function() {
  var $httpBackend;
  var davImportApiClient;

  beforeEach(module('linagora.esn.dav.import'));

  beforeEach(inject(function(_$httpBackend_, _davImportApiClient_) {
    $httpBackend = _$httpBackend_;
    davImportApiClient = _davImportApiClient_;
  }));

  describe('The importFromFile fn', function() {
    it('should POST to right endpoint to import the file', function() {
      var body = { fileId: '12345', target: '/addressbooks/bookHome/bookId.json' };

      $httpBackend.expectPOST('/linagora.esn.dav.import/api/import', body).respond(201);

      davImportApiClient.importFromFile(body.fileId, body.target);
      $httpBackend.flush();
    });
  });

});
