/*
    script file for the index.html page
*/

angular.module('ContactsApp', ['ui.router', 'firebase'])
    .constant('firebaseUrl', 'https://info343addr.firebaseio.com/contacts')
    .factory('contacts', function($firebaseArray, firebaseUrl) {
        return $firebaseArray(new Firebase(firebaseUrl));
    })
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('list', {
                url: '/contacts',
                templateUrl: 'views/contacts-list.html',
                controller: 'ContactsController'
            })
            .state('detail', {
                url: '/contacts/:id',
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
    .directive('validDate', function() {
        return {
            require: 'ngModel',
            link: function(scope, elem, attrs, ctrl) {
                ctrl.$validators.validDate = function(modelValue) {
                    return ctrl.$isEmpty(modelValue) || !isNaN(Date.parse(modelValue));
                }
            }
        }
    })
    .directive('inThePast', function() {
        return {
            require: 'ngModel',
            link: function(scope, elem, attrs, ctrl) {
                ctrl.$validators.inThePast = function(modelValue) {
                    return ctrl.$isEmpty(modelValue)
                        || isNaN(Date.parse(modelValue))
                        || (new Date(modelValue) <= new Date());
                };
            }
        };
    })
    .controller('ContactsController', function($scope, contacts) {
        $scope.contacts = contacts;
    })
    .controller('ContactDetailController', function($scope, $stateParams, $state, contacts) {
        contacts.$loaded().then(function() {
            $scope.contact = contacts.$getRecord($stateParams.id);
        });

        $scope.deleteContact = function() {
            contacts.$remove($scope.contact).then(function() {
                $state.go('list');
            });
        };
    })
    .controller('EditContactController', function($scope, $stateParams, $state, contacts) {
        $scope.contact = contacts.$getRecord($stateParams.id);

        $scope.saveContact = function() {
            var prom;
            if ($scope.contact.$id) {
                prom = contacts.$save($scope.contact);
            }
            else {
                prom = contacts.$add($scope.contact);
            }

            prom.then(function() {
                $state.go('list');
            });
        };
    });
