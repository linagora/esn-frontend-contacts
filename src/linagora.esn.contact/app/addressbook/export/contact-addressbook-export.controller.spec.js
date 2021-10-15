'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;

describe('The ContactAddressbookExportController controller', function() {
  var $rootScope, $controller;
  var contactAddressbookDisplayService;
  let contactAddressbookServiceMock;

  beforeEach(function() {
    angular.mock.module('linagora.esn.contact');

    contactAddressbookServiceMock = {
      exportAddressbook: sinon.spy()
    };

    angular.mock.module(function($provide) {
      $provide.value('contactAddressbookService', contactAddressbookServiceMock);
    });

    angular.mock.inject(function(
      _$controller_,
      _$rootScope_,
      _contactAddressbookDisplayService_
    ) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      contactAddressbookDisplayService = _contactAddressbookDisplayService_;
    });
  });

  function initController(addressbook) {
    var $scope = $rootScope.$new();

    return $controller('ContactAddressbookExportController', {
      $scope: $scope,
      addressbook: addressbook
    });
  }

  it('should convert addressbook to addressbookDisplayShell to get addressbook display name', function() {
    var addressbook = {
      bookName: '123'
    };
    var displayShell = {
      shell: addressbook,
      displayName: 'toto'
    };

    contactAddressbookDisplayService.convertShellToDisplayShell = sinon.spy(function() {
      return displayShell;
    });

    var controller = initController(addressbook);

    controller.$onInit();

    expect(contactAddressbookDisplayService.convertShellToDisplayShell).to.have.been.called;
    expect(controller.addressbookDisplayShell).to.deep.equal(displayShell);
  });

  it('should call the contactAddressbookService exportAddressbook function', function() {
    var addressbook = {
      bookId: '123',
      bookName: 'name'
    };

    var controller = initController(addressbook);

    controller.$onInit();
    controller.exportAddressBook();

    expect(contactAddressbookServiceMock.exportAddressbook).to.have.been.calledWith(addressbook);
  });
});
