
angular.module('linagora.esn.contact')
  .factory('contactDeleteConfirmationDialogService', contactDeleteConfirmationDialogService);

function contactDeleteConfirmationDialogService($modal) {
  return function(onConfirm) {
    return $modal({
      template: require('../contact/action/delete/contact-delete-confirmation-dialog.pug'),
      controller: function() {
        this.delete = onConfirm;
      },
      controllerAs: 'ctrl',
      backdrop: 'static',
      placement: 'center'
    });
  };
}
