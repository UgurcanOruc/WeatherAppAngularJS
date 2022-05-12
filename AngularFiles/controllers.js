// CONTROLLERS

weatherApp.controller('homeController', ['$scope', '$location', 'cityService', function ($scope, $location, cityService) {

    $scope.city = cityService.city;

    $scope.$watch('city', function() {
       cityService.city = $scope.city;
    });

    $scope.submit = function() {
        $location.path('/forecast');
    }
}]);


weatherApp.controller('forecastController', ['$scope', '$routeParams', 'cityService', 'weatherAPICall', function ($scope, $routeParams, cityService, weatherAPICall) {

    $scope.city = cityService.city;
    $scope.days = $routeParams.days || '2';
    $scope.weatherResult = weatherAPICall.call($scope.city, $scope.days);

    $scope.convertToCelcius = function(degK) {
        return Math.round(degK - 273);
    }

    $scope.convertToDate = function(dt) {
        return new Date(dt * 1000);
    }
}]);
