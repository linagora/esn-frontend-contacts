require('../constants.js');

angular.module('linagora.esn.davproxy')
  .factory('davClient', davClient);

function davClient($http, httpConfigurer, DAV_PATH) {
  return _davClient;

  function _davClient(method, path, headers = {}, body, params) {
    const requestHeaders = { ...httpConfigurer.getHeaders(), ...headers };
    var config = {
      url: httpConfigurer.getUrl(DAV_PATH.replace(/\/$/, '') + path),
      method: method,
      headers: requestHeaders,
      params: params
    };

    if (body) {
      config.data = body;
    }

    return $http(config);
  }
}
