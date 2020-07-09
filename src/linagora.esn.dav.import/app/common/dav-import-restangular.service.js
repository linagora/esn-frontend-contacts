(function() {
  'use strict';

  var MODULE_NAME = 'linagora.esn.dav.import';
  var MODULE_DIR_NAME = '/linagora.esn.dav.import';

  angular.module(MODULE_NAME)
    .factory('davImportRestangular', davImportRestangular);

  function davImportRestangular(Restangular) {
    return Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl(MODULE_DIR_NAME + '/api');
      RestangularConfigurer.setFullResponse(true);
    });
  }
})();
