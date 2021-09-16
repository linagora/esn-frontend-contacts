'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;

describe('The contactListItem directive', function() {
  var $compile, $rootScope, $scope, CONTACT_AVATAR_SIZE;
  var contactAddressbookDisplayService;
  let contactService;

  beforeEach(function() {
    contactService = {
      setContactMainEmail: sinon.spy()
    };

    angular.mock.module('esn.core');
    angular.mock.module('linagora.esn.contact', function($provide) {
      $provide.value('contactService', contactService);
    });
  });

  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _contactAddressbookDisplayService_, _CONTACT_AVATAR_SIZE_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    CONTACT_AVATAR_SIZE = _CONTACT_AVATAR_SIZE_;
    $scope = $rootScope.$new();
    $scope.contact = {
      emails: [],
      tel: [],
      addresses: [],
      social: [],
      urls: [],
      id: '12',
      addressbook: {
        bookId: '123',
        bookName: 'contacts'
      }
    };
    contactService.getContactAvatar = sinon.stub().returns($q.when({}));
    contactAddressbookDisplayService = _contactAddressbookDisplayService_;
    contactAddressbookDisplayService.convertShellToDisplayShell = angular.noop;
  }));

  function initDirective() {
    var element = $compile('<contact-list-item contact="contact" book-id="bookId"></contact-list-item>')($scope);

    $scope.$digest();

    return element;
  }

  it('should have list size for contact avatar', function() {
    expect(initDirective().isolateScope().avatarSize).to.equal(CONTACT_AVATAR_SIZE.list);
  });

  it('should set the displayShell in scope', function() {
    var element = initDirective();

    expect(element.isolateScope().displayShell).to.be.defined;
  });

  it('should display phone', function() {
    var phone = '+33333333';

    $scope.contact.tel = [{ type: 'work', value: phone }];
    var element = initDirective();

    expect(element[0].outerHTML).to.contain(phone);
  });

  it('should display work phone if N phones are set', function() {
    var phone = '+33333333';

    $scope.contact.tel = [{ type: 'home', value: 'homephone' }, { type: 'work', value: phone }];
    var element = initDirective();

    expect(element[0].outerHTML).to.contain(phone);
  });

  it('should display avatar of contact', function() {
    var phone = '+33333333';

    $scope.contact.tel = [{ type: 'home', value: 'homephone' }, { type: 'work', value: phone }];
    var element = initDirective();

    expect(element[0].outerHTML).to.contain(phone);
  });

  it('should display email', function() {
    var email = 'me@work.com';

    $scope.contact.emails = [{ type: 'work', value: email }];
    var element = initDirective();

    expect(element[0].outerHTML).to.contain(email);
  });

  it('should display work email if N emails are set', function() {
    var email = 'me@work.com';

    $scope.contact.emails = [{ type: 'home', value: 'm@home.com' }, { type: 'work', value: email }];
    var element = initDirective();

    expect(element[0].outerHTML).to.contain(email);
  });

  it('should allow to click anywhere to view contact', function() {
    var element = initDirective();

    var isoScope = element.isolateScope();

    isoScope.displayContact = sinon.spy();

    element.find('.contact-list-item').first().click();
    expect(isoScope.displayContact.callCount).to.equal(1);

    element.find('contact-photo').first().click();
    expect(isoScope.displayContact.callCount).to.equal(2);
  });

  it('should not display contact when click on email', function() {
    $scope.contact.emails = [{ type: 'home', value: 'me@home' }];
    var element = initDirective();

    var isoScope = element.isolateScope();

    isoScope.displayContact = sinon.spy();

    element.find('a[ng-href="mailto:me@home"]').click();
    expect(isoScope.displayContact.called).to.be.false;
  });

  it('should not display contact when click on phone', function() {
    $scope.contact.tel = [{ type: 'home', value: '123' }];
    var element = initDirective();

    var isoScope = element.isolateScope();

    isoScope.displayContact = sinon.spy();

    element.find('a[ng-href="tel:123"]').click();
    expect(isoScope.displayContact.called).to.be.false;
  });

  it('should translate the contactShell to displayShell', function() {
    var element = initDirective();
    var isoScope = element.isolateScope();

    expect(isoScope.displayShell.shell).to.deep.equal($scope.contact);
  });
});
