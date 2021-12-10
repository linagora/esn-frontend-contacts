
angular.module('esn.contact.libs')
  .factory('contactAddressbookHelper', contactAddressbookHelper);

function contactAddressbookHelper($q, contactAddressbookParser, contactDavClientService, CONTACT_ADDRESSBOOK_DAV_PROPERTIES, CONTACT_ACCEPT_HEADER, CONTACT_SHARING_SUBSCRIPTION_TYPE) {
  return {
    populateSubscriptionSource,
    formatAddressBookResponse,
    getUniqueAdressBookShells
  };

  function populateSubscriptionSource(addressbook) {
    if (!addressbook['openpaas:source']) {
      return $q.when(addressbook);
    }

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

  function formatAddressBookResponse(response, url) {
    const formattedAddressBook = {};

    if (url) {
      formattedAddressBook._links = {
        self: { href: url }
      };
    }

    Object.entries(CONTACT_ADDRESSBOOK_DAV_PROPERTIES).forEach(([key, value]) => {
      if (response[key]) {
        formattedAddressBook[value] = response[key];
      }
    });

    return { ...response, ...formattedAddressBook };
  }

  function getUniqueAdressBookShells(addressbooks) {
    if (!addressbooks) return;

    const uniqueAddressbookList = addressbooks.reduce((acc, current) => {
      const { shell, shell: { subscriptionType } } = current;
      const href = shell.source ? shell.source.href : shell.href;

      if (!acc[href] || subscriptionType === CONTACT_SHARING_SUBSCRIPTION_TYPE.delegation) {
        acc[href] = current;
      }

      return acc;
    }, {});

    return Object.values(uniqueAddressbookList);
  }
}
