'use strict';

/* global chai: false */
/* global sinon: false */

const expect = chai.expect;
const { module, inject } = angular.mock;

describe('The davClient service', function() {
  let httpConfigurer;
  let davClient;
  let $http;

  beforeEach(function() {
    module('linagora.esn.davproxy');

    httpConfigurer = {
      getHeaders: sinon.spy(),
      getUrl: sinon.spy(),
      setBaseUrl: () => {}
    };

    $http = sinon.spy();

    module(function($provide) {
      $provide.value('httpConfigurer', httpConfigurer);
      $provide.value('$http', $http);
    });

    inject(function(_davClient_) {
      davClient = _davClient_;
    });
  });

  it('should ask url to httpConfigurer', function() {
    davClient('get', '/test', {});
    expect($http).to.have.been.called;
    expect(httpConfigurer.getUrl).to.have.been.calledWith('/dav/api/test');
  });

  it('should ask headers httpConfigurer', function() {
    httpConfigurer.getHeaders = () => ({ httpConfigurer: true });
    davClient('get', '/test', { foo: 'bar' });
    expect($http).to.have.been.calledWith({
      headers: { foo: 'bar', httpConfigurer: true },
      method: 'get',
      params: undefined,
      url: undefined
    });
  });
});
