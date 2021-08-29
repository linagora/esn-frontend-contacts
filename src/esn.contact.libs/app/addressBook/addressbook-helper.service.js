
angular.module('esn.contact.libs')
  .factory('contactAddressbookHelper', contactAddressbookHelper);

function contactAddressbookHelper($q, contactAddressbookParser, contactDavClientService, CONTACT_ADDRESSBOOK_DAV_PROPERTIES, CONTACT_ACCEPT_HEADER) {
  return {
    populateSubscriptionSource,
    formatAddressBookResponse
  };

  function populateSubscriptionSource(addressbook) {
    if (addressbook['openpaas:source']) {
      const sourcePath = contactAddressbookParser.parseAddressbookPath(addressbook['openpaas:source']);
      const url = `/addressbooks/${sourcePath.bookId}/${sourcePath.bookName}.json`;
      const body = { properties: Object.keys(CONTACT_ADDRESSBOOK_DAV_PROPERTIES) };
      const headers = { Accept: CONTACT_ACCEPT_HEADER };

      return contactDavClientService('PROPFIND', url, headers, body)
        .then(({ data }) => ({
          ...addressbook,
          'openpaas:source': formatAddressBookResponse(data, url)
        }));
    }

    return $q.when(addressbook);
  }

  function formatAddressBookResponse(response, url) {
    const formattedAddressBook = {};

    if (url) {
      formattedAddressBook._links = {
        self: { href: url }
      };
    }

    Object.values(CONTACT_ADDRESSBOOK_DAV_PROPERTIES).forEach(key => {
      if (response[key]) {
        formattedAddressBook[key] = response[key];
      }
    });

    return { ...response, ...formattedAddressBook };
  }
}
