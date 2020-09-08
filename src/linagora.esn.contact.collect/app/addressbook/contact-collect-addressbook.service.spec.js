'use strict';

/* global chai: false */
var expect = chai.expect;

describe('The contactCollectAddressbookService service', function() {
  var contactCollectAddressbookService;

  beforeEach(function() {
    angular.mock.module('linagora.esn.contact.collect');

    angular.mock.inject(function(_contactCollectAddressbookService_) {
      contactCollectAddressbookService = _contactCollectAddressbookService_;
    });
  });

  describe('The isCollectedAddressbook function', function() {
    it('should return false when input shell is undefined or null', function() {
      expect(contactCollectAddressbookService.isCollectedAddressbook()).to.be.false;
      expect(contactCollectAddressbookService.isCollectedAddressbook(null)).to.be.false;
    });

    it('should return false when input shell has no bookName field', function() {
      expect(contactCollectAddressbookService.isCollectedAddressbook({})).to.be.false;
    });

    it('should return true when bookName is "collected"', function() {
      var shell = {
        bookName: 'collected'
      };

      expect(contactCollectAddressbookService.isCollectedAddressbook(shell)).to.be.true;
    });
  });
});
