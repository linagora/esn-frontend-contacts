require('./services/contact-configuration.service.js');

(function(angular) {
  'use strict';

  angular.module('linagora.esn.contact')
    .config(function($stateProvider, routeResolver) {
      $stateProvider
        .state('contact', {
          url: '/contact',
          template: require('./app.pug'),
          deepStateRedirect: {
            default: {
              state: 'contact.addressbooks',
              params: {
                bookId: 'all'
              }
            },
            params: true,
            fn: function() {
              return true;
            }
          },
          resolve: {
            isModuleActive: isModuleActive
          }
        })
        .state('contact.search', {
          url: '/search?q',
          params: {
            q: {
              value: '',
              squash: true
            }
          },
          views: {
            'main@contact': {
              template: require('./search/contact-search-result.pug'),
              controller: 'ContactSearchController',
              controllerAs: 'ctrl',
              resolve: {
                domain: routeResolver.session('domain'),
                user: routeResolver.session('user')
              }
            }
          }
        })
        .state('contact.addressbooks', {
          url: '/addressbooks/:bookId/:bookName',
          views: {
            'main@contact': {
              template: require('./contact/list/contact-list.pug'),
              controller: 'ContactListController',
              controllerAs: '$ctrl',
              resolve: {
                domain: routeResolver.session('domain'),
                user: routeResolver.session('user')
              }
            }
          }
        })
        .state('contact.addressbooks.settings', {
          url: '/settings',
          params: {
            previousState: 'contact.addressbooks'
          },
          resolve: {
            modalInstance: function($modal) {
              return $modal({
                template: '<contact-addressbook-settings />'
              });
            }
          },
          onExit: function(modalInstance) {
            modalInstance.hide();
          }
        })
        .state('contact.addressbooks.new', {
          url: '^/contact/new/:bookId/:bookName',
          views: {
            'main@contact': {
              template: require('./contact/create/contact-create.pug'),
              controller: 'newContactController',
              resolve: {
                domain: routeResolver.session('domain'),
                user: routeResolver.session('user')
              }
            }
          }
        })
        .state('contact.addressbooks.show', {
          url: '^/contact/show/:bookId/:bookName/:cardId',
          params: {
            previousState: 'contact.addressbooks'
          },
          resolve: {
            modalInstance: function($modal) {
              return $modal({
                template: '<contact-show />',
                resolve: {
                  domain: routeResolver.session('domain'),
                  user: routeResolver.session('user')
                }
              });
            }
          },
          onExit: function(modalInstance) {
            modalInstance.hide();
          }
        })
        .state('contact.addressbooks.edit', {
          url: '^/contact/edit/:bookId/:bookName/:cardId',
          params: {
            previousState: 'contact.addressbooks'
          },
          resolve: {
            modalInstance: function($modal) {
              return $modal({
                template: '<contact-edit />',
                resolve: {
                  domain: routeResolver.session('domain'),
                  user: routeResolver.session('user')
                }
              });
            }
          },
          onExit: function(modalInstance) {
            modalInstance.hide();
          }
        })
        .state('home', {
          onEnter: function($state, $timeout) {
            $timeout(() => {
              $state.go('contact');
            });
          }
        });

      function isModuleActive($location, contactConfiguration) {
        return contactConfiguration.get('enabled', true).then(function(isEnabled) {
          if (!isEnabled) {
            $location.path('/');
          }
        }).catch(function() {
          $location.path('/');
        });
      }
    });
})(angular);
