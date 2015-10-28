/*
    script file for the movies.html file
*/

angular.module('MoviesApp', [])
    .controller('MoviesController', function($scope, $http) {
        //get our movies JSON file
        $http.get('data/movies-2014.min.json')
            .then(function(results) {
                //results is an object with info about the entire HTTP response
                //the data itself can be accessed via its `data` property
                $scope.movies = results.data;
            });
    });
