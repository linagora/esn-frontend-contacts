angular.module('esn.contact.libs')
  .factory('contactDavUrlService', contactDavUrlService);

function contactDavUrlService($log, $window, esnUserConfigurationService) {
  const DAVSERVER_CONFIG = 'davserver';

  return {
    getFrontendUrl
  };

  /**
   * returns the url of the DAV server
   *
   * @return {string} - the DAV server url
   */
  function getFrontendUrl() {
    return esnUserConfigurationService.get([DAVSERVER_CONFIG], 'core')
      .then(config => {
        if (!config || !config.length) {
          $log.error('No davserver configuration found');

          return getDefaultUrl();
        }

        const davserver = config.find(item => item.name === DAVSERVER_CONFIG);

        if (!davserver || !davserver.value || !davserver.value.frontend || !davserver.value.frontend.url) {
          $log.error('davserver configuration is not set');

          return getDefaultUrl();
        }

        return removeTrailingSlash(davserver.value.frontend.url);
      })
      .catch(err => {
        $log.error('Error while getting davserver configuration', err);

        return getDefaultUrl();
      });
  }

  /**
   * returns the default url of the davserver (the origin url of the current window)
   *
   * @returns {string} - the default url of the davserver
   */
  function getDefaultUrl() {
    return $window.location.origin;
  }

  /**
   * removes the trailing slash of the url
   *
   * @param {String} url  - the url to remove the trailing slash from
   * @returns {String} - the url without the trailing slash
   */
  function removeTrailingSlash(url) {
    return url.replace(/\/$/, '');
  }
}
