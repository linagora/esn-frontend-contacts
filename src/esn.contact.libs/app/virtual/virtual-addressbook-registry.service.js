'use strict';

const _ = require('lodash');

angular.module('esn.contact.libs')
  .factory('ContactVirtualAddressBookRegistry', ContactVirtualAddressBookRegistry);

function ContactVirtualAddressBookRegistry($q) {
  var addressbooks = {};

  return {
    put,
    get,
    list
  };

  function put(addressbook) {
    addressbooks[addressbook.id] = addressbook;
  }

  function get(id) {
    return $q.when(addressbooks[id]);
  }

  function list() {
    return $q.when(_.values(addressbooks));
  }
}
