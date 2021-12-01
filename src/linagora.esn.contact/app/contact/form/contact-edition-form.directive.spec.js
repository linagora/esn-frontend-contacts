'use strict';

/* global chai: false */

var expect = chai.expect;

describe('The contactEditionForm directive', function() {
  var $compile, $rootScope, $scope, session;
  var CONTACT_AVATAR_SIZE, DEFAULT_ADDRESSBOOK_NAME, CONTACT_COLLECTED_ADDRESSBOOK_NAME;
  var contactAddressbookService, esnConfigMock;

  beforeEach(function() {
    angular.mock.module('esn.core');
    angular.mock.module('linagora.esn.contact');
    angular.mock.module(function($provide) {
      esnConfigMock = function() {
        return $q.when(true);
      };

      $provide.value('esnConfig', esnConfigMock);
    });
  });

  beforeEach(angular.mock.inject(function(
    _$compile_,
    _$rootScope_,
    _session_,
    _contactAddressbookService_,
    _CONTACT_AVATAR_SIZE_,
    _DEFAULT_ADDRESSBOOK_NAME_,
    _CONTACT_COLLECTED_ADDRESSBOOK_NAME_
  ) {
    contactAddressbookService = _contactAddressbookService_;
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    session = _session_;
    CONTACT_AVATAR_SIZE = _CONTACT_AVATAR_SIZE_;
    DEFAULT_ADDRESSBOOK_NAME = _DEFAULT_ADDRESSBOOK_NAME_;
    CONTACT_COLLECTED_ADDRESSBOOK_NAME = _CONTACT_COLLECTED_ADDRESSBOOK_NAME_;
    $scope = $rootScope.$new();
    $scope.contact = {
      emails: [],
      tel: [],
      addresses: [],
      social: [],
      urls: []
    };
    contactAddressbookService.listAddressbooksUserCanCreateContact = function() {
      return $q.when([{
        bookName: DEFAULT_ADDRESSBOOK_NAME,
        href: '/addressbooks/userId/' + DEFAULT_ADDRESSBOOK_NAME + '.json'
      }, {
        bookName: CONTACT_COLLECTED_ADDRESSBOOK_NAME,
        href: '/addressbooks/userId/' + CONTACT_COLLECTED_ADDRESSBOOK_NAME + '.json'
      }]);
    };
  }));

  beforeEach(function() {
    session.user = { _id: 'userId' };
  });

  function initDirective(scope) {
    var element = $compile('<contact-edition-form contact="contact" addressbook-path="addressbookPath" contact-state="new"></contact-edition-form>')(scope);

    scope.$digest();

    return element;
  }

  it('should have bigger size for contact avatar', function() {
    var element = initDirective($scope);

    expect(element.isolateScope().avatarSize).to.equal(CONTACT_AVATAR_SIZE.bigger);
  });

  it('should only show address book select box when create new contact', function() {
    var createElement = $compile('<contact-edition-form contact="contact" addressbook-path" contact-state="new"></contact-edition-form>')($scope);

    $scope.$digest();

    expect(createElement.find('.contact-addressbook-selector').hasClass('ng-hide')).to.be.false;

    var editElement = $compile('<contact-edition-form contact="contact" addressbook-path"></contact-edition-form>')($scope);

    $scope.$digest();

    expect(editElement.find('.contact-addressbook-selector').hasClass('ng-hide')).to.be.true;
  });

  it('should preselect Address Book according to current address book', function() {
    $scope.addressbookPath = '/addressbooks/userId/' + CONTACT_COLLECTED_ADDRESSBOOK_NAME + '.json';

    var element = initDirective($scope);

    $scope.$digest();

    expect(element.find('[ng-model="addressbookPath"]').val()).to.equal('/addressbooks/userId/' + CONTACT_COLLECTED_ADDRESSBOOK_NAME + '.json');
  });
});
