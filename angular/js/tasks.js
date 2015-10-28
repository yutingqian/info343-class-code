/* 
    script for the tasks.html file 
*/

angular.module('Tasks', [])
    .constant('tasksKey', 'tasks')
    .controller('TasksController', function($scope, tasksKey) {
        'use strict';

        //initialize tasks property on the scope to an empty array
        $scope.tasks = angular.fromJson(localStorage.getItem(tasksKey)) || [];
        //initialize newTask to an empty object
        $scope.newTask = {};

        function saveTasks() {
            localStorage.setItem(tasksKey, angular.toJson($scope.tasks));
        }

        //add a function to add newTask to the array
        $scope.addTask = function() {
            //push the current value of newTask into the tasks array
            $scope.tasks.push($scope.newTask);

            //save the tasks
            saveTasks();

            //reset newTask to an empty object
            $scope.newTask = {};
        };

        //function to goggle task done state
        $scope.toggleDone = function(task) {
            task.done = !task.done;
            saveTasks();
        };
    });