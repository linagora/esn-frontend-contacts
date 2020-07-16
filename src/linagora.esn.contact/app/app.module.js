(function(angular) {
  'use strict';

  angular.module('linagora.esn.contact', [
    'esn.core',
    'esn.mailto-handler',
    'esn.router',
    'esn.session',
    'esn.notification',
    'esn.avatar',
    'esn.async-action',
    'esn.registry',
    'esn.configuration',
    'esn.application-menu',
    'esn.constants',
    'esn.infinite-list',
    'esn.websocket',
    'esn.http',
    'restangular',
    'esn.alphalist',
    'mgcrea.ngStrap.datepicker',
    'mgcrea.ngStrap.alert',
    'uuid4',
    'mgcrea.ngStrap.helpers.dateParser',
    'mgcrea.ngStrap.helpers.dateFormatter',
    'linagora.esn.graceperiod',
    'linagora.esn.davproxy',
    'esn.search',
    'esn.scroll',
    'esn.multi-input',
    'esn.attendee',
    'esn.header',
    'esn.form.helper',
    'esn.sidebar',
    'op.dynamicDirective',
    'esn.url',
    'esn.aggregator',
    'esn.cache',
    'esn.highlight',
    'esn.provider',
    'esn.module-registry',
    'esn.datetime',
    'esn.i18n',
    'esn.user',
    'linagora.esn.dav.import',
    'esn.user-configuration'
  ]);
})(angular);

require('esn-frontend-common-libs/src/frontend/js/modules/core.js');
require('esn-frontend-common-libs/src/frontend/js/modules/esn.router.js');
require('esn-frontend-common-libs/src/frontend/js/modules/session.js');
require('esn-frontend-common-libs/src/frontend/js/modules/notification.js');
require('esn-frontend-common-libs/src/frontend/js/modules/avatar.js');
require('esn-frontend-common-libs/src/frontend/js/modules/alphalist.js');
require('esn-frontend-common-libs/src/frontend/js/modules/async-action.js');
require('esn-frontend-common-libs/src/frontend/js/modules/registry.js');
require('esn-frontend-common-libs/src/frontend/js/modules/config/config.module.js');
require('esn-frontend-common-libs/src/frontend/js/modules/application-menu.js');
require('esn-frontend-common-libs/src/frontend/js/constants.js');
require('esn-frontend-common-libs/src/frontend/js/modules/infinite-list/infinite-list.module.js');
require('esn-frontend-common-libs/src/frontend/js/modules/websocket.js');
require('esn-frontend-common-libs/src/frontend/js/modules/http.js');
require('esn-frontend-common-libs/src/modules/linagora.esn.graceperiod/frontend/js/app.js');
require('esn-frontend-common-libs/src/frontend/js/modules/search/search.module.js');
require('esn-frontend-common-libs/src/frontend/js/modules/scroll.js');
require('esn-frontend-common-libs/src/frontend/js/modules/multi-input.js');
require('esn-frontend-common-libs/src/frontend/js/modules/attendee/attendee.module.js');
require('esn-frontend-common-libs/src/frontend/js/modules/header/header.js');
require('esn-frontend-common-libs/src/frontend/js/modules/form-helper/form-helper.module.js');
require('esn-frontend-common-libs/src/frontend/js/modules/sidebar.js');
require('esn-frontend-common-libs/src/frontend/js/modules/url.js');
require('esn-frontend-common-libs/src/frontend/js/modules/aggregator.js');
require('esn-frontend-common-libs/src/frontend/js/modules/cache.js');
require('esn-frontend-common-libs/src/frontend/js/modules/highlight.js');
require('esn-frontend-common-libs/src/frontend/js/modules/provider.js');
require('esn-frontend-common-libs/src/frontend/js/modules/module-registry/module-registry.module.js');
require('esn-frontend-common-libs/src/frontend/js/modules/datetime/datetime.module.js');
require('esn-frontend-common-libs/src/frontend/js/modules/i18n/i18n.module.js');
require('esn-frontend-common-libs/src/frontend/js/modules/user/user.module.js');
require('esn-frontend-common-libs/src/frontend/js/modules/user-configuration/user-configuration.module.js');
require('../../linagora.esn.davproxy/js/app.js');
require('../../linagora.esn.dav.import/app/app.module.js');

require ('./addressbook/acl/addressbook-acl-helper.servive.js');
require ('./addressbook/action/addressbook-action-delete.service.js');
require ('./addressbook/action/addressbook-action-edit.service.js');
require ('./addressbook/action/addressbook-action-export.service.js');
require ('./addressbook/action/addressbook-action-settings.service.js');
require ('./addressbook/addressbook-cache.service.js');
require ('./addressbook/addressbook-display.service.js');
require ('./addressbook/addressbook-shared-configuration/addressbook-shared-configuration.component.js');
require ('./addressbook/addressbook-shared-configuration/addressbook-shared-configuration.controller.js');
require ('./addressbook/addressbook-shared-configuration/item/addressbook-shared-configuration-item.component.js');
require ('./addressbook/addressbook-shared-configuration/item/addressbook-shared-configuration-item.controller.js');
require ('./addressbook/addressbook-shared-configuration/right-display/addressbook-shared-configuration-right-display.component.js');
require ('./addressbook/addressbook-shared-configuration/right-display/addressbook-shared-configuration-right-display.controller.js');
require ('./addressbook/addressbook.constants.js');
require ('./addressbook/addressbook.service.js');
require ('./addressbook/create/contact-addressbook-create.controller.js');
require ('./addressbook/default-addressbook/default-addressbook-display-shell.run.js');
require ('./addressbook/default-addressbook/default-addressbook-display-shell.service.js');
require ('./addressbook/default-addressbook/default-addressbook-helper.service.js');
require ('./addressbook/delete/addressbook-delete.controller.js');
require ('./addressbook/display-shell/addressbook-display-shell-registry.service.js');
require ('./addressbook/display-shell/addressbook-display-shell.service.js');
require ('./addressbook/edit/addressbook-edit.controller.js');
require ('./addressbook/export/contact-addressbook-export.controller.js');
require ('./addressbook/group-addressbook/contact-group-addressbook-display-shell.service.js');
require ('./addressbook/group-addressbook/contact-group-addressbook.run.js');
require ('./addressbook/group-addressbook/contact-group-addressbook.service.js');
require ('./addressbook/import/contact-addressbook-import.controller.js');
require ('./addressbook/settings/contact-addressbook-settings.component.js');
require ('./addressbook/settings/contact-addressbook-settings.controller.js');
require ('./addressbook/settings/delegation/contact-addressbook-settings-delegation.component.js');
require ('./addressbook/settings/delegation/contact-addressbook-settings-delegation.controller.js');
require ('./addressbook/settings/main/contact-addressbook-settings-main.component.js');
require ('./addressbook/settings/main/contact-addressbook-settings-main.controller.js');
require ('./addressbook/settings/subheader/contact-addressbook-settings-subheader.component.js');
require ('./addressbook/shell/addressbook-shell.service.js');
require ('./addressbook/user-addressbook/contact-user-addressbook-display-shell.service.js');
require ('./addressbook/user-addressbook/contact-user-addressbook.run.js');
require ('./addressbook/user-addressbook/contact-user-addressbook.service.js');
require ('./addressbook/virtual/user/shells/user-display-shell.js');
require ('./addressbook/virtual/user/shells/user-shell-helper.service.js');
require ('./addressbook/virtual/user/shells/user-shell.js');
require ('./addressbook/virtual/user/user-virtual-addressbook-displayshell.service.js');
require ('./addressbook/virtual/virtual-addressbook-configuration.service.js');
require ('./addressbook/virtual/virtual-addressbook-pagination-provider.service.js');
require ('./addressbook/virtual/virtual-addressbook-registry.service.js');
require ('./addressbook/virtual/virtual-addressbook.model.js');
require ('./addressbook/virtual/virtual-addressbook.service.js');
require ('./app.constant.js');
require ('./app.controllers.js');
require ('./app.module-registry.run.js');
require ('./app.routes.js');
require ('./app.run.js');
require ('./config/contact-config-form.component.js');
require ('./config/domain-addressbook/contact-config-domain-addressbook.component.js');
require ('./config/domain-addressbook/contact-config-domain-addressbook.controller.js');
require ('./contact/action/contact-action.run.js');
require ('./contact/action/copy/contact-action-copy.component.js');
require ('./contact/action/copy/contact-action-copy.controller.js');
require ('./contact/action/delete/contact-delete-action-item.directive.js');
require ('./contact/action/edit/contact-edit-action-item.directive.js');
require ('./contact/action/move/contact-action-move.component.js');
require ('./contact/action/move/contact-action-move.controller.js');
require ('./contact/contact.constants.js');
require ('./contact/contact.service.js');
require ('./contact/create/contact-create-subheader.directive.js');
require ('./contact/edit/contact-edit-subheader.directive.js');
require ('./contact/form/contact-edition-form.directive.js');
require ('./contact/form/relaxed-date-for-bs-date-picker.directive.js');
require ('./contact/helper.service.js');
require ('./contact/list/contact-list-card.directive.js');
require ('./contact/list/contact-list-cards.directive.js');
require ('./contact/list/contact-list-displayer.directive.js');
require ('./contact/list/contact-list-item.directive.js');
require ('./contact/list/contact-list-items.directive.js');
require ('./contact/list/contact-list-subheader.directive.js');
require ('./contact/list/contact-list-toggle.directive.js');
require ('./contact/photo/contact-photo.directive.js');
require ('./contact/shell/contact-display-shell.service.js');
require ('./contact/shell/contact-shell-builder.service.js');
require ('./contact/shell/contact-shell-comparator.service.js');
require ('./contact/shell/contact-shell-display-builder.service.js');
require ('./contact/shell/contact-shell-helper.service.js');
require ('./contact/shell/display-shell-provider.service.js');
require ('./contact/shell/shell.service.js');
require ('./contact/show/contact-display.directive.js');
require ('./contact/show/contact-show-subheader.directive.js');
require ('./contact/vcard/helper.service.js');
require ('./contact/vcard/vcard-builder.service.js');
require ('./controllers/contact-list.controller.js');
require ('./controllers/contact-show.controller.js');
require ('./directives/application-menu-contact.directive.js');
require ('./directives/contact-category-letter.directive.js');
require ('./maintenance/contact-maintenance.component.js');
require ('./maintenance/domain-members/contact-maintenance-domain-members.component.js');
require ('./maintenance/domain-members/contact-maintenance-domain-members.controller.js');
require ('./maintenance/domain-members/contact-maintenance-domain-members.service.js');
require ('./pagination/addressbook-pagination-provider.service.js');
require ('./pagination/addressbook-pagination-register.run.js');
require ('./pagination/addressbook-pagination-registry.service.js');
require ('./pagination/addressbook-pagination.js');
require ('./pagination/addressbook-pagination.service.js');
require ('./pagination/multiple-addressbook-pagination-provider.service.js');
require ('./pagination/search-addressbook-pagination-provider.service.js');
require ('./search/search-provider.service.js');
require ('./search/search-providers.service.js');
require ('./search/search-query.run.js');
require ('./search/search-results.service.js');
require ('./search/search.controller.js');
require ('./search/search.run.js');
require ('./search/sub-header/contact-search-subheader.directive.js');
require ('./services/addressbook-parser.service.js');
require ('./services/avatar.service.js');
require ('./services/close-contact-form.service.js');
require ('./services/contact-api-client.service.js');
require ('./services/contact-attendee-provider.service.js');
require ('./services/contact-configuration.service.js');
require ('./services/contact-delete.service.js');
require ('./services/contact-display-error.service.js');
require ('./services/contact-highlight-helpers.service.js');
require ('./services/contact-list-scrolling.service.js');
require ('./services/contact-list-toggle-display.service.js');
require ('./services/contact-list-toggle-event.service.js');
require ('./services/contact-localtion-helper.service.js');
require ('./services/contact-restangular.service.js');
require ('./services/contact-update-data.service.js');
require ('./services/live-update/contact-live-update-initializer.service.js');
require ('./services/live-update/contact-live-update.service.js');
require ('./services/live-update/initialize-contact-live-update.js');
require ('./services/open-contact-form.service.js');
require ('./services/send-data-to-backend.service.js');
require ('./services/shared-contact-data.service.js');
require ('./sharing/constants.js');
require ('./sharing/sharee/contact-sharee.service.js');
require ('./sidebar/addressbook-item/contact-sidebar-addressbook-item.component.js');
require ('./sidebar/addressbook-item/contact-sidebar-addressbook-item.controller.js');
require ('./sidebar/addressbooks-list/contact-sidebar-addressbooks-list.component.js');
require ('./sidebar/sidebar.component.js');
require ('./sidebar/sidebar.controller.js');