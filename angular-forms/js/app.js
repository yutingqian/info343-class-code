/*
    script file for the index.html page
*/

angular.module('ContactsApp', ['ui.router', 'angular-uuid', 'LocalStorageModule'])
    .constant('storageKey', 'contacts-List')
    .factory('contacts', function(uuid, localStorageService, storageKey) {
        return[{
           id: 'default-delete-me',
            fname: 'Fred',
            lname: 'Flintstone',
            phone: '206-555-5454',
            dob: '1/1/1994'
        }];
    })
    .config(function($stateProvider, $urlRouterProvider) {
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
    .controller('ContactController', function($scope, contacts) {
        $scope.contacts = contacts;
    })
    .controller('ContactDetailController', function($scope, $stateParams, $state, contacts) {

        $scope.contact = contacts.find(function(contact) {
           return contact.id === $stateParams.id;
        });

    })
    .controller('EditContactController', function($scope, $stateParams, $state, contacts) {

        var existingContact = contacts.find(function(contact) {
            return contact.id === $stateParams.id;
        });

        $scope.contact = angular.copy(existingContact);

        $scope.save = function() {
            angular.copy($scope.contact, existingContact);
            $state.go('list');
        }
    });
