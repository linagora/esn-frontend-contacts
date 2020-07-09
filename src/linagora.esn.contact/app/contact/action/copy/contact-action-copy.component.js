(function(angular) {
  angular.module('linagora.esn.contact')

    .component('contactActionCopy', {
      template: require("./contact-action-copy.pug"),
      bindings: {
        contact: '<'
      },
      controller: 'contactActionCopyController'
    });
})(angular);
