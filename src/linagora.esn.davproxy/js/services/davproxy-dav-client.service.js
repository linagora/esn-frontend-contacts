const _ = require('lodash');

angular.module('linagora.esn.davproxy')
  .factory('davClient', davClient)
  .factory('DavURLService', DAVURLService);

function davClient($http, $q, httpConfigurer, DavURLService, tokenAPI) {
  let davServerUrlPromise = null;

  return _davClient;

  function _davClient(method, path, headers = {}, body, params) {
    const requestHeaders = { ...httpConfigurer.getHeaders(), ...headers };

    return _configureRequest(method, path, requestHeaders, body, params).then($http);
  }

  function _configureRequest(method, path, headers = {}, body, params) {
    return $q.all([_getDavServerUrl(), tokenAPI.getWebToken()])
      .then(([serverBaseUrl, { data: jwt }]) => {
        const config = {
          url: `${serverBaseUrl}${path}`,
          headers: {
            ...headers,
            Authorization: `Bearer ${jwt}`
          },
          method,
          params
        };

        if (body) {
          config.data = body;
        }

        return config;
      });
  }

  function _getDavServerUrl() {
    davServerUrlPromise = davServerUrlPromise || DavURLService.getFrontendURL();

    return davServerUrlPromise;
  }

}

function DAVURLService($log, $window, esnUserConfigurationService) {
  var DAVSERVER_CONFIGURATION = 'davserver';

  return {
    getFrontendURL: getFrontendURL
  };

  function getFrontendURL() {
    return esnUserConfigurationService.get([DAVSERVER_CONFIGURATION], 'core')
      .then(function(configurations) {
        if (!configurations || !configurations.length) {
          $log.debug('No valid configurations found for davserver');

          return getDefaultURL();
        }

        var davserver = _.find(configurations, { name: DAVSERVER_CONFIGURATION });

        if (!davserver) {
          $log.debug('davserver configuration is not set');

          return getDefaultURL();
        }

        return davserver.value && davserver.value.frontend && davserver.value.frontend.url ?
          removeTrailingSlash(davserver.value.frontend.url) :
          getDefaultURL();
      }, function(err) {
        $log.debug('Can not get davserver from configuration', err);

        return getDefaultURL();
      });
  }

  function getDefaultURL() {
    return $window.location.origin;
  }

  function removeTrailingSlash(url) {
    return url.replace(/\/$/, '');
  }
}

