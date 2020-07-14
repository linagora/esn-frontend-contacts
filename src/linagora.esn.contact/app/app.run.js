require('./services/contact-attendee-provider.service.js');
require('./addressbook/addressbook-cache.service.js');
require('./contact/shell/contact-shell-builder.service.js');
require('./services/contact-configuration.service.js');

(function(angular) {
  'use strict';

  angular.module('linagora.esn.contact').run(runBlock);

  function runBlock(
    dynamicDirectiveService,
    attendeeService,
    ContactAttendeeProvider,
    AddressbookCache,
    ContactShellBuilder,
    contactConfiguration
  ) {
    contactConfiguration.get('enabled', true).then(function(isEnabled) {
      if (!isEnabled) {
        return;
      }
      var contact = new dynamicDirectiveService.DynamicDirective(true, 'application-menu-contact', {
        priority: 35
      });

      dynamicDirectiveService.addInjection('esn-application-menu', contact);
      attendeeService.addProvider(ContactAttendeeProvider);
      ContactShellBuilder.setAddressbookCache(AddressbookCache);
    });
  }
})(angular);
