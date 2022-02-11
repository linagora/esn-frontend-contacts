'use strict';

const _ = require('lodash');

require('../../../sharing/constants.js');

angular.module('linagora.esn.contact')
  .controller('contactAddressbookSettingsMainController', contactAddressbookSettingsMainController);

function contactAddressbookSettingsMainController(
  contactAddressbookService,
  CONTACT_ADDRESSBOOK_PUBLIC_RIGHT,
  CONTACT_SHARING_SHARE_ACCESS,
  CONTACT_SHARING_SUBSCRIPTION_TYPE,
  CONTACT_SHARING_SHARE_ACCESS_CHOICES,
  CONTACT_ADDRESSBOOK_MEMBERS_RIGHTS,
  CONTACT_SHARING_WRITE_PRIVILEGE
) {
  var self = this;

  self.$onInit = $onInit;
  self.canUpdatePublicRight = canUpdatePublicRight;
  self.canUpdateMembersRight = canUpdateMembersRight;

  function $onInit() {
    contactAddressbookService.getAddressbookUrl(self.addressbook).then(function(url) {
      self.cardDAVUrl = url;
    });
    self.publicRights = Object.keys(CONTACT_ADDRESSBOOK_PUBLIC_RIGHT).map(function(right) {
      return {
        value: CONTACT_ADDRESSBOOK_PUBLIC_RIGHT[right].value,
        title: CONTACT_ADDRESSBOOK_PUBLIC_RIGHT[right].longLabel
      };
    });
    self.membersRights = Object.keys(CONTACT_ADDRESSBOOK_MEMBERS_RIGHTS).map(function(right) {
      return {
        value: CONTACT_ADDRESSBOOK_MEMBERS_RIGHTS[right].label,
        title: CONTACT_ADDRESSBOOK_MEMBERS_RIGHTS[right].longLabel
      };
    });

    if (self.addressbook.subscriptionType === CONTACT_SHARING_SUBSCRIPTION_TYPE.delegation) {
      _initShareOwner();
      _initShareAccess();
    }
  }

  function canUpdatePublicRight() {
    return self.addressbook.canShareAddressbook;
  }

  function canUpdateMembersRight() {
    return self.addressbook.canShareAddressbook;
  }

  function _initShareOwner() {
    var shareOwner = _getShareOwner(self.addressbook.source.sharees);

    shareOwner && shareOwner.getUser()
      .then(function(user) {
        self.shareOwner = user;
      });
  }

  function _initShareAccess() {
    const { READWRITE } = CONTACT_SHARING_SHARE_ACCESS_CHOICES;

    const access = Object.values(CONTACT_SHARING_SHARE_ACCESS_CHOICES)
      .find(({ value }) => value === self.addressbook.shareAccess);

    if (!access) return;

    if (access.value >= READWRITE.value) {
      self.shareAccess = access;

      return;
    }

    self.shareAccess = self.addressbook.source.rights.public === CONTACT_SHARING_WRITE_PRIVILEGE ?
      READWRITE :
      access;
  }

  function _getShareOwner(sharees) {
    return _.find(sharees, { access: CONTACT_SHARING_SHARE_ACCESS.SHAREDOWNER });
  }

}
