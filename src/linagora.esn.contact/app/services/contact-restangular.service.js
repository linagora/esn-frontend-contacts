'use strict';

angular.module('linagora.esn.contact')
  .factory('contactRestangularService', contactRestangularService);

function contactRestangularService(Restangular, httpErrorHandler, httpConfigurer) {
  const BASE_API_PATH = '/contact/api';

  const contactRestangularServiceInstance = Restangular.withConfig(function(RestangularConfigurer) {
    RestangularConfigurer.setFullResponse(true);
    RestangularConfigurer.setBaseUrl(BASE_API_PATH);
    RestangularConfigurer.setErrorInterceptor(function(response) {
      if (response.status === 401) {
        httpErrorHandler.redirectToLogin();
      }

      return true;
    });
  });

  httpConfigurer.manageRestangular(contactRestangularServiceInstance, BASE_API_PATH);

  return contactRestangularServiceInstance;
}
