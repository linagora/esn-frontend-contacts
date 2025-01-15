require('../shell/shell.service.js');
require('../shell/contact-shell-helper.service.js');
require('../app.constant.js');

(function(angular) {
  'use strict';

  angular.module('esn.contact.libs')
    .service('ContactShellBuilder', ContactShellBuilder);

  function ContactShellBuilder(
    $q,
    ContactShell,
    ContactShellHelper,
    contactUpdateDataService,
    contactAvatarService,
    ICAL
  ) {

    this.setAddressbookCache = function(cache) {
      this.addressbookCache = cache;
    };

    this.fromVcard = function(vcard, cardId) {
      var contact = new ContactShell(new ICAL.Component(vcard), undefined, cardId);

      if (contactUpdateDataService.contactUpdatedIds.indexOf(contact.id) > -1) {
        contactAvatarService.forceReloadDefaultAvatar(contact);
      }

      return contact;
    };

    this.populateAddressbook = function(shell, bookId, bookName) {
      return this.addressbookCache.get({ bookId: bookId, bookName: bookName }).then(function(ab) {
        shell.addressbook = ab;

        return shell;
      }, function() {
        return shell;
      });
    };

    this.fromWebSocket = function(data) {
      return this.populateAddressbook(this.fromVcard(data.vcard), data.bookId, data.bookName);
    };

    this.fromCardListResponse = function(response) {
      var self = this;

      if (response && response.data && response.data._embedded &&
        response.data._embedded['dav:item'] && response.data._embedded['dav:item'].length) {
        return $q.all(response.data._embedded['dav:item'].map(function(vcard) {
          var metadata = ContactShellHelper.getMetadata(vcard._links.self.href);
          
          var bookHome, bookName, cardId;
          
          if (metadata) {
            bookHome = metadata.bookId;
            bookName = metadata.bookName;
            cardId = metadata.cardId;
          }

          var contactShell = self.fromVcard(vcard.data, cardId);

          if (bookHome && bookName) {
            return self.populateAddressbook(contactShell, bookHome, bookName);
          }

          return contactShell;
        }));
      }

      return $q.when([]);
    };

    this.fromCardSearchResponse = function(response) {
      var self = this;

      if (response && response.data && response.data._embedded &&
        response.data._embedded['dav:item'] && response.data._embedded['dav:item'].length) {
        return $q.all(response.data._embedded['dav:item'].map(function(vcard) {
          if (!vcard || !vcard.data) {
            return;
          }

          const metadata = ContactShellHelper.getMetadata(vcard._links.self.href);
          var openpaasAddressbook = vcard['openpaas:addressbook']; // This field only available on search contacts in subscribed address books
          var bookHome, bookName, cardId;
          
          if (openpaasAddressbook) {
            bookHome = openpaasAddressbook.bookHome;
            bookName = openpaasAddressbook.bookName;
          } else {
            
            if (metadata) {
              bookHome = metadata.bookId;
              bookName = metadata.bookName;
            }
          }

          if (metadata) {
            cardId = metadata.cardId;
          }

          var contactShell = self.fromVcard(vcard.data, cardId);

          if (bookHome && bookName) {
            return self.populateAddressbook(contactShell, bookHome, bookName);
          }

          return contactShell;
        }).filter(Boolean));
      }

      return $q.when([]);
    };
  }
})(angular);
