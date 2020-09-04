require('../../services/contact-list-toggle-display.service.js');
require('../../services/contact-list-toggle-event.service.js');
require('../../app.constant.js');

(function(angular) {
  'use strict';

  angular.module('linagora.esn.contact')
    .directive('contactListToggle', contactListToggle);

  function contactListToggle(
    ContactListToggleDisplayService,
    ContactListToggleEventService,
    CONTACT_LIST_DISPLAY
  ) {
    return {
      restrict: 'E',
      template: require('./contact-list-toggle.pug'),
      link: function(scope) {

        function isToggleOn(value) {
          return value === CONTACT_LIST_DISPLAY.cards;
        }

        scope.toggleContactDisplay = isToggleOn(ContactListToggleDisplayService.getCurrentDisplay());

        scope.updateDisplay = function(toggleOn) {
          ContactListToggleDisplayService.setCurrentDisplay(toggleOn ? CONTACT_LIST_DISPLAY.cards : CONTACT_LIST_DISPLAY.list);
        };

        ContactListToggleEventService.listen(scope, function(evt, value) {
          var toggleValue = isToggleOn(value);

          if (toggleValue === scope.toggleContactDisplay) {
            return;
          }
          scope.toggleContactDisplay = toggleValue;
        });

        scope.$watch('toggleContactDisplay', function(newValue, oldValue) {
          if (oldValue === newValue) {
            return;
          }
          scope.updateDisplay(newValue);
        });

      }
    };
  }
})(angular);
