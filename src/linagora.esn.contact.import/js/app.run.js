require('./services.js');

(function(angular) {
  'use strict';

  angular.module('linagora.esn.contact.import')
    .run(runBlock);

  function runBlock(session, ContactImportNotificationService) {
    session.ready.then(function(session) {
      ContactImportNotificationService.startListen(session.user._id);
    });
  }
})(angular);
