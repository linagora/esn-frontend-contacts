require('./addressbook-parser.service');
require('./contact-api-client.service.js');
require('./addressbook-display.service.js');
require('./virtual-addressbook.service.js');
require('./constants.js');
require('./contact-dav-url.service.js');

(function(angular) {
  'use strict';

  angular.module('esn.contact.libs')
    .factory('contactAddressbookService', contactAddressbookService);

  function contactAddressbookService(
    $q,
    $window,
    $log,
    session,
    contactDavUrlService,
    contactAddressbookParser,
    ContactAPIClient,
    contactAddressbookDisplayService,
    ContactVirtualAddressBookService,
    FileSaver,
    CONTACT_ADDRESSBOOK_TYPES,
    CONTACT_ADDRESSBOOK_STATES,
    CONTACT_ADDRESSBOOK_MEMBERS_RIGHTS,
    CONTACT_SHARING_INVITE_STATUS,
    CONTACT_SHARING_SUBSCRIPTION_TYPE,
    CONTACT_EXPORT_FILE_TYPE
  ) {
    return {
      createAddressbook: createAddressbook,
      createGroupAddressbook: createGroupAddressbook,
      getAddressbookByBookName: getAddressbookByBookName,
      getAddressbookUrl: getAddressbookUrl,
      listAddressbooks: listAddressbooks,
      listAggregatedAddressbooks: listAggregatedAddressbooks,
      listAddressbooksUserCanCreateContact: listAddressbooksUserCanCreateContact,
      removeAddressbook: removeAddressbook,
      updateAddressbook: updateAddressbook,
      listSubscribableAddressbooks: listSubscribableAddressbooks,
      listSubscribedAddressbooks: listSubscribedAddressbooks,
      subscribeAddressbooks: subscribeAddressbooks,
      shareAddressbook: shareAddressbook,
      updateAddressbookPublicRight: updateAddressbookPublicRight,
      updateGroupAddressbookMembersRight: updateGroupAddressbookMembersRight,
      exportAddressbook
    };

    function getAddressbookByBookName(bookName, bookId) {
      return ContactVirtualAddressBookService.get(bookName).then(function(addressbook) {
        if (addressbook) {
          return addressbook;
        }

        bookId = bookId || session.user._id;

        return ContactAPIClient.addressbookHome(bookId).addressbook(bookName).get();
      });
    }

    function listAggregatedAddressbooks() {
      return listAddressbooks().then(function(addressbooks) {
        return addressbooks.filter(function(addressbook) {
          return !addressbook.excludeFromAggregate;
        });
      });
    }

    function listAddressbooks() {
      return $q.all([
        _listAddressbooksForOwner(session.user._id),
        _listGroupAddressbooks(),
        _listVirtualAddressbooks()
      ]).then(function(results) {
        return [].concat(...results);
      });
    }

    function _listAddressbooksForOwner(ownerId) {
      return ContactAPIClient.addressbookHome(ownerId).addressbook().list({
        personal: true,
        subscribed: true,
        shared: true,
        contactsCount: true,
        inviteStatus: CONTACT_SHARING_INVITE_STATUS.ACCEPTED
      });
    }

    function _listVirtualAddressbooks() {
      return ContactVirtualAddressBookService.list();
    }

    function _listGroupAddressbooks() {
      return ContactAPIClient.getGroupMembership('/principals/users/' + session.user._id)
        .then(function(groupPrincipals) {
          var promises = groupPrincipals.map(function(principal) {
            var parsedPrincipal = contactAddressbookParser.parsePrincipalPath(principal);

            return _listAddressbooksForOwner(parsedPrincipal.id);
          });

          return $q.all(promises)
            .then(function(results) {
              return [].concat(...results);
            });
        });
    }

    function listAddressbooksUserCanCreateContact() {
      return listAddressbooks().then(function(addressbooks) {
        return addressbooks.filter(function(addressbook) {
          return addressbook.canCreateContact;
        });
      });
    }

    function createAddressbook(addressbook) {
      if (!addressbook) {
        return $q.reject(new Error('Address book is required'));
      }

      if (!addressbook.name) {
        return $q.reject(new Error('Address book\'s name is required'));
      }

      addressbook.type = CONTACT_ADDRESSBOOK_TYPES.user;

      return ContactAPIClient
        .addressbookHome(session.user._id)
        .addressbook()
        .create(addressbook);
    }

    function createGroupAddressbook(addressbook, groupId) {
      if (!addressbook) {
        return $q.reject(new Error('Address book is required'));
      }

      if (!addressbook.name) {
        return $q.reject(new Error('Address book\'s name is required'));
      }

      if (!groupId) {
        return $q.reject(new Error('groupId is required'));
      }

      addressbook.type = CONTACT_ADDRESSBOOK_TYPES.group;
      addressbook.state = addressbook.state || CONTACT_ADDRESSBOOK_STATES.enabled;
      addressbook.acl = addressbook.acl || CONTACT_ADDRESSBOOK_MEMBERS_RIGHTS.READ.value; // by default, members of group just have only read permission

      return ContactAPIClient
        .addressbookHome(groupId)
        .addressbook()
        .create(addressbook);
    }

    function removeAddressbook(addressbook) {
      return ContactAPIClient
        .addressbookHome(session.user._id)
        .addressbook(addressbook.bookName)
        .remove();
    }

    function updateAddressbook(addressbook) {
      return ContactAPIClient
        .addressbookHome(addressbook.bookId)
        .addressbook(addressbook.bookName)
        .update(addressbook);
    }

    function listSubscribableAddressbooks(userId) {
      return $q.all([
        ContactAPIClient.addressbookHome(userId).addressbook().list({ public: true }),
        ContactAPIClient.addressbookHome(session.user._id).addressbook().list({
          inviteStatus: CONTACT_SHARING_INVITE_STATUS.NORESPONSE,
          shared: true, shareOwner: userId
        })
      ])
        .then(function(data) {
          return data[0].concat(data[1]);
        });
    }

    function listSubscribedAddressbooks() {
      return ContactAPIClient.addressbookHome(session.user._id).addressbook().list({ subscribed: true });
    }

    function subscribeAddressbooks(addressbookShells) {
      return $q.all(addressbookShells.map(function(addressbookShell) {
        if (addressbookShell.subscriptionType === CONTACT_SHARING_SUBSCRIPTION_TYPE.delegation) {
          var displayname = contactAddressbookDisplayService.buildDisplayName(addressbookShell.source);

          return ContactAPIClient
            .addressbookHome(addressbookShell.bookId)
            .addressbook(addressbookShell.bookName)
            .acceptShare({ displayname: displayname });
        }

        var formattedSubscriptions = {
          description: addressbookShell.description,
          name: contactAddressbookDisplayService.buildDisplayName(addressbookShell),
          type: CONTACT_ADDRESSBOOK_TYPES.subscription,
          'openpaas:source': {
            _links: {
              self: {
                href: addressbookShell.href
              }
            }
          }
        };

        return ContactAPIClient
          .addressbookHome(session.user._id)
          .addressbook()
          .create(formattedSubscriptions);
      }));
    }

    function shareAddressbook(addressbookShell, sharees) {
      return ContactAPIClient
        .addressbookHome(addressbookShell.bookId)
        .addressbook(addressbookShell.bookName)
        .share(sharees);
    }

    function updateAddressbookPublicRight(addressbook, publicRight) {
      return ContactAPIClient
        .addressbookHome(addressbook.bookId)
        .addressbook(addressbook.bookName)
        .updatePublicRight(publicRight);
    }

    function updateGroupAddressbookMembersRight(addressbook, membersRight) {
      return ContactAPIClient
        .addressbookHome(addressbook.bookId)
        .addressbook(addressbook.bookName)
        .updateMembersRight(membersRight);
    }

    function getAddressbookUrl(addressbook) {
      return contactDavUrlService.getFrontendUrl().then(function(url) {
        return [url, _sanitizeAddressbookHref(addressbook)]
          .map(function(fragment) {
            return fragment.replace(/^\/|\/$/g, '');
          })
          .join('/');
      });
    }

    function exportAddressbook(addressbook) {
      return ContactAPIClient
        .addressbookHome(addressbook.bookId)
        .addressbook(addressbook.bookName)
        .exportAddressbook()
        .then(({ data }) => {
          const vcfBlob = new Blob([data], { type: CONTACT_EXPORT_FILE_TYPE });

          FileSaver.saveAs(vcfBlob, `${addressbook.bookName}.vcf`);
        });
    }

    function _sanitizeAddressbookHref(addressbook) {
      var parsedPath = contactAddressbookParser.parseAddressbookPath(addressbook.href);

      return ['addressbooks', parsedPath.bookId, parsedPath.bookName].join('/');
    }
  }
})(angular);
