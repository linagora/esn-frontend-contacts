
/* global chai, sinon: false */

const { expect } = chai;

describe('contact DAV URL Service', () => {
  let esnUserConfigurationServiceMock;
  let contactDavUrlService;
  let $rootScope;

  beforeEach(() => {
    angular.mock.module('esn.contact.libs');

    esnUserConfigurationServiceMock = {
      get: sinon.stub()
    };

    angular.mock.module(function($provide) {
      $provide.value('esnUserConfigurationService', esnUserConfigurationServiceMock);
    });

    angular.mock.inject(function(_contactDavUrlService_, _$rootScope_) {
      contactDavUrlService = _contactDavUrlService_;
      $rootScope = _$rootScope_;
    });
  });

  describe('The getFrontendUrl function', () => {
    it('should return the dav server frontend url from the esn config', done => {
      esnUserConfigurationServiceMock.get.returns(Promise.resolve([
        {
          name: 'davserver',
          value: {
            frontend: {
              url: 'http://dav.server.url'
            }
          }
        }
      ]));

      contactDavUrlService.getFrontendUrl()
        .then(url => {
          expect(url).to.equal('http://dav.server.url');
          done();
        })
        .catch(err => done(err));

      $rootScope.$digest();
    });

    it('should use the default url if there is no davserver config in esn', done => {
      esnUserConfigurationServiceMock.get.returns(Promise.resolve([]));

      contactDavUrlService.getFrontendUrl()
        .then(url => {
          expect(url).to.equal('http://localhost:9876');
          done();
        });
      $rootScope.$digest();
    });

    it('should use the default url if there was an error while fetching the esn config', done => {
      esnUserConfigurationServiceMock.get.returns(Promise.reject(new Error('Error')));

      contactDavUrlService.getFrontendUrl()
        .then(url => {
          expect(url).to.equal('http://localhost:9876');
          done();
        });

      $rootScope.$digest();
    });
  });
});
