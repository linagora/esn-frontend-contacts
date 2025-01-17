'use strict';

/* global chai, sinon: false */

var expect = chai.expect;

describe('The contactEditionForm directive', function() {
  var $compile, $rootScope, $scope, session;
  var CONTACT_AVATAR_SIZE, DEFAULT_ADDRESSBOOK_NAME, CONTACT_COLLECTED_ADDRESSBOOK_NAME;
  var contactAddressbookService, esnConfigMock;
  let userAPIMock, contactAddressbookDisplayServiceMock;

  beforeEach(function() {
    contactAddressbookDisplayServiceMock = {
      convertShellsToDisplayShells: sinon.spy(function(shells) {
        return shells.map(shell => ({
          bookName: shell.bookName,
          shell: shell
        }));
      }),
      sortAddressbookDisplayShells: shells => shells
    };
    angular.mock.module('esn.core');
    angular.mock.module('linagora.esn.contact');
    angular.mock.module(function($provide) {
      esnConfigMock = function() {
        return $q.when(true);
      };

      const user = {
        data: {
          id: 123456,
          firstname: 'john',
          lastname: 'doe'
        }
      };

      userAPIMock = {
        user: sinon.mock().returns(
          $q.when(user)
        ),
        currentUser: () => $q.when(user)
      };

      $provide.value('esnConfig', esnConfigMock);
      $provide.value('userAPI', userAPIMock);
      $provide.value('contactAddressbookDisplayService', contactAddressbookDisplayServiceMock);
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
      return $q.when([
        {
          bookName: DEFAULT_ADDRESSBOOK_NAME,
          href: '/addressbooks/userId/' + DEFAULT_ADDRESSBOOK_NAME + '.json'
        },
        {
          bookName: CONTACT_COLLECTED_ADDRESSBOOK_NAME,
          href: '/addressbooks/userId/' + CONTACT_COLLECTED_ADDRESSBOOK_NAME + '.json'
        },
        {
          bookName: 'shared',
          href: '/addressbooks/123456/123456.json',
          group: undefined,
          isSubscription: true,
          source: {
            bookId: 123456
          }
        }
      ]);
    };
  }));

  beforeEach(function() {
    session.user = { _id: 'userId' };
    session.fetchUser = () => $q.when(session.user);
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

  it('should try to load the user using the userId collected from the shared addressbook', () => {
    initDirective($scope);

    expect(userAPIMock.user).to.have.been.calledWith(123456);
  });
});
