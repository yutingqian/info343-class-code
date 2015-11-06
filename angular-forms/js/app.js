/*
    script file for the index.html page
*/

angular.module('ContactsApp', ['ui.router', 'angular-uuid', 'LocalStorageModule'])
    .constant('storageKey', 'contacts-list')
    .factory('contacts', function(localStorageService, storageKey) {
        return localStorageService.get(storageKey) || [];
    })
    //declare a module configuration function that configures our local UI states
    .config(function($stateProvider, $urlRouterProvider) {
        //declare three UI 'states': one for list views, one for detail, and one for editing
        $stateProvider
            .state('list', {
                url: '/contacts',
                templateUrl: 'views/contacts-list.html',
                controller: 'ContactController'
            })
            .state('detail', {
                url: '/contact/:id',
                templateUrl: 'views/contact-detail.html',
                controller: 'ContactDetailController'
            })
            .state('edit', {
                url: '/contacts/:id/edit',
                templateUrl: 'views/edit-contact.html',
                controller: 'EditContactController'
        });

        $urlRouterProvider.otherwise('/contacts');

    })
    //register a directive for custom validation of dates in the past
    .directive('inThePast', function() {
        return {
          require: 'ngModel',
            link: function(scope, elem, attrs, controller) {
                controller.$validators.inThePast = function(modelValue) {
                    var today = new Date();
                    return (new Date(modelValue) <= today);
                }
            }
        };
    })
    .controller('ContactController', function($scope, contacts) {
        $scope.contacts = contacts;
    })
    .controller('ContactDetailController', function($scope, $stateParams, $state, contacts) {

        $scope.contact = contacts.find(function(contact) {
           return contact.id === $stateParams.id;
        });

    })
    .controller('EditContactController', function($scope, $stateParams, $state,
                                                  uuid, localStorageService, storageKey, contacts) {

        var existingContact = contacts.find(function(contact) {
            return contact.id === $stateParams.id;
        });

        $scope.contact = angular.copy(existingContact);

        $scope.save = function() {
            if ($scope.contact.id) {
                angular.copy($scope.contact, existingContact);
            } else {
                $scope.contact.id = uuid.v4();
                contacts.push($scope.contact);
            }

            localStorageService.set(storageKey, contacts);

            $state.go('list');
        }
    });
