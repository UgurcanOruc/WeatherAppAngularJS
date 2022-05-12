// MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);


// ROUTES
weatherApp.config(function ($routeProvider) {

    $routeProvider

    .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'homeController'
    })

    .when('/forecast', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    })

    .when('/forecast/:days', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    });

});


// SERVICES
weatherApp.service('cityService', function() {
    this.city = ''
});

// CONTROLLERS

weatherApp.controller('homeController', ['$scope', 'cityService', function ($scope, cityService) {

     $scope.city = cityService.city;

     $scope.$watch('city', function() {
        cityService.city = $scope.city;
     });

}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function ($scope, $resource, $routeParams, cityService) {

    $scope.city = cityService.city;

    $scope.days = $routeParams.days || '2';

    $scope.weatherAPI = $resource('https://api.openweathermap.org/data/2.5/forecast', { callback: 'JSON_CALLBACK'}, { get: { method: 'JSONP'}});

    $scope.weatherResult = $scope.weatherAPI.get({ appid: 'a77b6a5078a494988f7b5c9fe589e431', q: $scope.city, cnt: $scope.days});

    $scope.convertToCelcius = function(degK) {
        return Math.round(degK - 273);
    }

    $scope.convertToDate = function(dt) {
        

        return new Date(dt * 1000);

    }

    console.log($scope.weatherResult);

}]);


// DIRECTIVES
weatherApp.directive('weatherReport', function() {

    return {
        restrict: 'E',
        templateUrl: 'directives/weatherReport.html',
        replace: true,
        scope: {
            weatherDay: '=',
            convertToStandard: '&',
            convertToDate: '&',
            dateFormat: '@'
        }
    }

});