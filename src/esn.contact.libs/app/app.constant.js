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

  .constant('CONTACT_ATTRIBUTES_ORDER', {
    email: ['Work', 'Home', 'Other'],
    address: ['Work', 'Home', 'Other'],
    phone: ['Work', 'Mobile', 'Home', 'Other'],
    social: ['Skype', 'Twitter', 'Other']
  })
  .constant('CONTACT_EXPORT_HEADER', 'application/vcard')
  .constant('CONTACT_EXPORT_FILE_TYPE', 'application/vcard;charset=utf-8')
  .constant('CONTACT_ADDRESSBOOK_DAV_PROPERTIES', {
    '{DAV:}displayname': 'dav:name',
    '{urn:ietf:params:xml:ns:carddav}addressbook-description': 'carddav:description',
    '{DAV:}acl': 'dav:acl',
    '{DAV:}invite': 'dav:invite',
    '{DAV:}share-access': 'dav:share-access',
    '{DAV:}group': 'dav:group',
    '{http://open-paas.org/contacts}subscription-type': 'openpaas:subscription-type',
    '{http://open-paas.org/contacts}source': 'openpaas:source',
    '{http://open-paas.org/contacts}type': 'type',
    '{http://open-paas.org/contacts}state': 'state',
    '{http://open-paas.org/contacts}numberOfContacts': 'numberOfContacts',
    acl: 'acl'
  });
