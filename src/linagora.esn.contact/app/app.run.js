require('./services/contact-attendee-provider.service.js');
require('./addressbook/addressbook-cache.service.js');
require('./contact/shell/contact-shell-builder.service.js');
require('./services/contact-configuration.service.js');

(function(angular) {
  'use strict';

  angular.module('linagora.esn.contact')
    .run(runBlock)
    .run(addTemplateCache);

  function runBlock(
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

      attendeeService.addProvider(ContactAttendeeProvider);
      ContactShellBuilder.setAddressbookCache(AddressbookCache);
    });
  }

  function addTemplateCache($templateCache) {
    $templateCache.put('/contact/app/search/contact-search.html', require('./search/contact-search.pug'));
    $templateCache.put('/contact/app/contact/list/contact-right-sidebar.html', require('./contact/list/contact-right-sidebar.pug'));
    $templateCache.put('/contact/app/addressbook/create/contact-addressbook-create.html', require('./addressbook/create/contact-addressbook-create.pug'));
    $templateCache.put('/contact/app/addressbook/import/contact-addressbook-import.html', require('./addressbook/import/contact-addressbook-import.pug'));
    $templateCache.put('/contact/app/contact/photo/contact-photo-child.html', require('./contact/photo/contact-photo-child.pug'));
    $templateCache.put('/contact/app/contact/list/contact-list-action-drop-menu.html', require('./contact/list/contact-list-action-drop-menu.pug'));
  }
})(angular);
