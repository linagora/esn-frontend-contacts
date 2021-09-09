'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;

describe('The contactPhoto directive', function() {

  var element, $compile, $scope;
  var DEFAULT_AVATAR;
  let contactService;

  beforeEach(function() {
    angular.mock.module('esn.core');

    contactService = {
      setContactMainEmail: sinon.spy()
    };
    angular.mock.module('linagora.esn.contact', function ($provide) {
      $provide.value('contactService', contactService);
    });
  });

  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_) {
    $scope = _$rootScope_.$new();
    $compile = _$compile_;
    DEFAULT_AVATAR = '/contacts/images/default_avatar.png';
  }));

  beforeEach(function() {
    contactService.getContactAvatar = sinon.stub().returns($q.when({}));

    $scope.contact = {
      id: '12',
      addressbook: {
        bookId: '123',
        bookName: 'contacts'
      }
    };
    element = $compile('<contact-photo contact="contact"></contact-photo>')($scope);
  });

  it('should use the default avatar if contact.photo is not defined', function() {
    $scope.$digest();

    expect(element.find('img').attr('src')).to.equal(DEFAULT_AVATAR);
  });

  it('should use the contact photo if defined', function() {
    $scope.contact = {
      id: '12',
      addressbook: {
        bookId: '123',
        bookName: 'contacts'
      }
    };

    contactService.getContactAvatar = sinon.stub().returns($q.when('data:image/png,base64;abcd='));

    // Re-run this so that element can have the correct value
    element = $compile('<contact-photo contact="contact"></contact-photo>')($scope);
    $scope.$digest();

    expect(element.find('img').attr('ng-src')).to.equal('data:image/png,base64;abcd=');
  });

  describe('with editable attribute', function() {

    beforeEach(angular.mock.inject(function($compile, $rootScope) {
      $scope = $rootScope.$new();
      $scope.contact = {
        id: '12',
        addressbook: {
          bookId: '123',
          bookName: 'contacts'
        }
      };
      element = $compile('<contact-photo editable="true" contact="contact"></contact-photo>')($scope);
    }));

    it('should display the hint', function() {
      $scope.$digest();

      expect(element.find('i').css('display')).to.not.equal('none');
    });
  });
});
