'use strict';

/* global ICAL */

angular.module('esn.contact.libs')
  .constant('CONTACT_ACCEPT_HEADER', 'application/vcard+json')
  .constant('CONTACT_CONTENT_TYPE_HEADER', 'application/vcard+json')
  .constant('CONTACT_PREFER_HEADER', 'return=representation')
  .constant('CONTACT_LIST_DEFAULT_SORT', 'fn')
  .constant('CONTACT_LIST_PAGE_SIZE', 20)

  .constant('ICAL', ICAL)
  .constant('DEFAULT_ADDRESSBOOK_NAME', 'contacts')
  .constant('CONTACT_COLLECTED_ADDRESSBOOK_NAME', 'collected')
  .constant('CONTACT_FALLBACK_ATTRIBUTE_TYPE', 'Other')
  .constant('GRACE_DELAY', 8000)

  .constant('CONTACT_ADDRESSBOOK_DAV_PROPERTIES', [
    '{DAV:}displayname',
    '{urn:ietf:params:xml:ns:carddav}addressbook-description',
    '{DAV:}acl',
    '{DAV:}invite',
    '{DAV:}share-access',
    '{DAV:}group',
    '{http://open-paas.org/contacts}subscription-type',
    '{http://open-paas.org/contacts}source',
    '{http://open-paas.org/contacts}type',
    '{http://open-paas.org/contacts}state',
    '{http://open-paas.org/contacts}numberOfContacts',
    'acl'
  ])

  .constant('CONTACT_ATTRIBUTES_ORDER', {
    email: ['Work', 'Home', 'Other'],
    address: ['Work', 'Home', 'Other'],
    phone: ['Work', 'Mobile', 'Home', 'Other'],
    social: ['Skype', 'Twitter', 'Other']
  });
