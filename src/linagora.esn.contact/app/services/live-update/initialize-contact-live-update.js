require('./contact-live-update-initializer.service.js');

(function(angular) {
  'use strict';

  angular.module('linagora.esn.contact')
    .run(initializeContactLiveUpdate);

  function initializeContactLiveUpdate(ContactLiveUpdateInitializer) {
    ContactLiveUpdateInitializer.start();
  }
})(angular);
