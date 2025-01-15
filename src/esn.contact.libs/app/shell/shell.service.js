require('../vcard/helper.service.js');
require('../app.constant.js');

(function(angular) {
  'use strict';

  angular.module('esn.contact.libs')
    .factory('ContactShell', ContactShellFactory);

  function ContactShellFactory(
    contactVcardHelper,
    CONTACT_ATTRIBUTES_ORDER
  ) {
    function ContactShell(vcard, etag, uid) {
      const vcardId = vcard.getFirstPropertyValue('uid');

      if (uid && uid.length && uid !== vcardId) {
        this.id = uid;
      } else {
        this.id = vcardId;
      }

      this.displayName = vcard.getFirstPropertyValue('fn');

      var name = vcard.getFirstPropertyValue('n');

      this.firstName = name ? name[1] : '';
      this.lastName = name ? name[0] : '';

      this.org = vcard.getFirstPropertyValue('org');
      this.orgName = this.org ? this.org[0] : '';
      this.orgRole = vcard.getFirstPropertyValue('role');

      this.emails = contactVcardHelper.getMultiValue(vcard, 'email', CONTACT_ATTRIBUTES_ORDER.email).map(function(mail) {
        mail.value = mail.value.replace(/^mailto:/i, '');

        return mail;
      });

      this.tel = contactVcardHelper.getMultiValue(vcard, 'tel', CONTACT_ATTRIBUTES_ORDER.phone).map(function(tel) {
        tel.value = tel.value.replace(/^tel:/i, '');

        return tel;
      });

      this.addresses = contactVcardHelper.getMultiAddress(vcard, 'adr', CONTACT_ATTRIBUTES_ORDER.address);
      this.social = contactVcardHelper.getMultiValue(vcard, 'socialprofile', CONTACT_ATTRIBUTES_ORDER.social);
      this.urls = contactVcardHelper.getMultiValue(vcard, 'url');

      var catprop = vcard.getFirstProperty('categories');
      var cats = catprop && catprop.getValues().concat([]);
      var starredIndex = cats ? cats.indexOf('starred') : -1;

      this.starred = starredIndex > -1;
      if (this.starred) {
        cats.splice(starredIndex, 1);
      }
      this.tags = cats ? cats.map(function(cat) { return { text: cat }; }) : [];

      var bday = vcard.getFirstProperty('bday');

      if (bday) {
        var type = bday.type,
          value = bday.getFirstValue();

        if (type === 'text') {
          this.birthday = value;
        } else if (typeof value.toJSDate === 'function') {
          this.birthday = value.toJSDate();
        }
      }

      this.nickname = vcard.getFirstPropertyValue('nickname');
      this.notes = vcard.getFirstPropertyValue('note');

      this.vcard = vcard;
      this.etag = etag;
      this.photo = vcard.getFirstPropertyValue('photo');
    }

    return ContactShell;
  }
})(angular);
