'use strict';

/* global chai,sinon: false */

const { inject, module } = angular.mock;
const { expect } = chai;

describe('The contactRestangularService service', function() {
  let contactRestangularService;
  let httpConfigurerMock;

  beforeEach(function() {
    httpConfigurerMock = {
      setBaseUrl: () => { },
      manageRestangular: sinon.stub()
    };
  });

  beforeEach(module('esn.http'));
  beforeEach(module('linagora.esn.contact'));

  beforeEach(module(function($provide) {
    $provide.value('httpConfigurer', httpConfigurerMock);
  }));

  beforeEach(inject(function(_contactRestangularService_) {
    contactRestangularService = _contactRestangularService_;
  }));

  it('should register itself to the httpConfigurer.manageRestangular', function() {
    expect(httpConfigurerMock.manageRestangular).to.have.been.calledWith(contactRestangularService);
  });
});
