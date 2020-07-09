const injections = require('esn-frontend-common-libs/src/require-angular-injections.js');

injections.push("linagora.esn.contact");
injections.push("linagora.esn.contact.import");
injections.push("linagora.esn.davproxy");
injections.push("linagora.esn.dav.import");

module.exports = injections;
