/* script file for the index.html page */

angular.module('TasksApp', [])
    .controller('TasksController', function($scope) {
        'use strict';

        $scope.tasks = [];
        $scope.newTask = {};

        $scope.addTask = function() {
            $scope.tasks.push($scope.newTask);
            $scope.newTask = {};
        };

    });