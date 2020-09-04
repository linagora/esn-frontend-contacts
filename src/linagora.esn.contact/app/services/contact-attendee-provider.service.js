(function(angular) {
  'use strict';

  angular.module('linagora.esn.contact')
    .factory('ContactAttendeeProvider', ContactAttendeeProvider);

  function ContactAttendeeProvider() {
    return {
      objectType: 'contact',
      template: require('../contact/auto-complete/contact-auto-complete.pug')
    };
  }

})(angular);
