require('../services/shared-contact-data.service.js');
require('../services/contact-localtion-helper.service.js');

(function(angular) {
  'use strict';

  angular.module('linagora.esn.contact')
    .factory('openContactForm', openContactForm);

  function openContactForm(sharedContactDataService, ContactLocationHelper) {
    return function(options) {
      if (options.contact) {
        sharedContactDataService.contact = options.contact;
      }
      ContactLocationHelper.contact.new(options.bookId, options.bookName, options.shouldReplaceState);
    };
  }
})(angular);
