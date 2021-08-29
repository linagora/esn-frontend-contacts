
require('./contact-dav-url.service.js');

angular.module('esn.contact.libs')
  .factory('contactDavClientService', contactDavClientService);

function contactDavClientService($http, $q, tokenAPI, contactDavUrlService) {
  let cachedDavUrlPromise = null;

  return (method, path, headers = {}, body, params) => _prepareRequest(method, path, headers, body, params).then($http);

  /**
   * returns a configured $http request to the dav server
   *
   * @param {string} method   - HTTP method
   * @param {string} path     - DAV path
   * @param {Object} headers  - HTTP headers
   * @param {Object} body     - HTTP body
   * @param {Object} params   - HTTP params
   *
   * @returns {Promise} - configured request promise
   */
  function _prepareRequest(method, path, headers = {}, body, params) {
    return $q.all([tokenAPI.getWebToken(), _getDavServerUrl()])
      .then(([{ data: jwt }, davUrl]) => {
        const config = {
          method,
          url: `${davUrl}${path}`,
          headers: {
            ...headers,
            Authorization: `Bearer ${jwt}`
          },
          params
        };

        if (body) {
          config.data = body;
        }

        return config;
      });
  }

  /**
   * Get the DAV server URL
   *
   * @returns {Promise} - A promise that resolves to the DAV server URL
   */
  function _getDavServerUrl() {
    cachedDavUrlPromise = cachedDavUrlPromise || contactDavUrlService.getFrontendUrl();

    return cachedDavUrlPromise;
  }
}
