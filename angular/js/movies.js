/*
    script file for the movies.html file
*/

angular.module('MoviesApp', ['ui.router'])
    .constant('ratingsMap', {
        'Not Rated': 0,
        'G': 1,
        'PG': 2,
        'PG-13': 3,
        'R': 4,
        'NC-17': 5,
        'X': 6
    })
    .factory('moviesJSON', function($http, ratingsMap) {
        return $http.get('data/movies-2014.min.json')
            .then(function(results) {
                //results is an object with info about the entire HTTP response
                //the data itself can be accessed via its `data` property

                //use map to transform the array of movies by adding
                //a `ratingOrdinal` property that we can use to sort by
                //rating severity, and a stable id set to the array index
                return results.data.map(function(movie, index) {
                    movie.ratingOrdinal = ratingsMap[movie.rating];
                    movie.id = index;
                    return movie;
                });
            });
    })
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('list', {
                url: '/movies',
                templateUrl: 'views/movies-list.html',
                controller: 'MoviesController'
            })
            .state('detail', {
                url: '/movies/:movieId',
                templateUrl: 'views/movies-detail.html',
                controller: 'MovieDetailController'
            });

        $urlRouterProvider.otherwise('/movies');
    })
    .controller('MoviesController', function($scope, moviesJSON) {
        moviesJSON.then(function(data) {
            $scope.movies = data;

            $scope.distributors = _.sortBy(_.uniq(_.pluck($scope.movies, 'distributor')));
        });

        $scope.setSortProp = function(propName) {
            if ($scope.sortProp === propName) {
                $scope.sortReverse = !$scope.sortReverse;
            }
            else {
                $scope.sortProp = propName;
                $scope.sortReverse = false;
            }
        }; //setSortProp
    })
    .controller('MovieDetailController', function($scope, $stateParams, moviesJSON) {
        moviesJSON.then(function(data) {
            $scope.movie = data[$stateParams.movieId];
        });

    });
