(function(angular) {
  angular.module('linagora.esn.contact')

    .component('contactActionMove', {
      template: require('./contact-action-move.pug'),
      bindings: {
        contact: '<'
      },
      controller: 'contactActionMoveController'
    });
})(angular);
