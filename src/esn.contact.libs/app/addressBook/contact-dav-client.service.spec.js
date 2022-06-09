/* global chai, sinon : false */

const { expect } = chai;

describe('the contactDavClient service', () => {
  let tokenApiMock, contactDavUrlServiceMock, $httpMock;
  let contactDavClient;

  beforeEach(angular.mock.module('esn.contact.libs'));

  beforeEach(function() {
    tokenApiMock = {
      getWebToken: sinon.stub().returns(Promise.resolve({ data: '123' }))
    };

    contactDavUrlServiceMock = {
      getFrontendUrl: sinon.stub().returns(Promise.resolve('http://frontend.url'))
    };

    $httpMock = sinon.spy();

    angular.mock.module(function($provide) {
      $provide.value('tokenAPI', tokenApiMock);
      $provide.value('contactDavUrlService', contactDavUrlServiceMock);
      $provide.value('$http', $httpMock);
    });

    angular.mock.inject(function(_contactDavClientService_) {
      contactDavClient = _contactDavClientService_;
    });
  });

  it('should request a JWT token', () => {
    contactDavClient('GET', '/path', {});
    expect(tokenApiMock.getWebToken).to.have.been.called;
  });

  it('should request the DAV server url', () => {
    contactDavClient('GET', '/path', {});
    expect(contactDavUrlServiceMock.getFrontendUrl).to.have.been.called;
  });
});
