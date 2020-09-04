(function(angular) {
  'use strict';

  angular.module('linagora.esn.contact')
    .factory('contactAddressbookActionDelete', contactAddressbookActionDelete);

  function contactAddressbookActionDelete($modal) {
    var deleteAction = {
      name: 'Delete',
      icon: 'delete',
      when: function(context) {
        return context.addressbook.shell.canDeleteAddressbook;
      },
      execute: _openDeleteModal
    };

    return deleteAction;

    function _openDeleteModal(addressbook) {
      $modal({
        template: require('../delete/addressbook-delete.pug'),
        backdrop: 'static',
        placement: 'center',
        controller: 'ContactAddressbookDeleteController',
        controllerAs: '$ctrl',
        locals: {
          addressbook: addressbook
        }
      });
    }
  }
})(angular);
