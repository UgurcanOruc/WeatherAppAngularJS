// SERVICES
weatherApp.service('cityService', function() {
    this.city = ''
});

weatherApp.service('weatherAPICall', [ '$resource', function ($resource) {
    
    this.call = function (cityName, days) {
      var weatherAPI = $resource('https://api.openweathermap.org/data/2.5/forecast', { callback: 'JSON_CALLBACK'}, { get: { method: 'JSONP'}});
      return weatherAPI.get({ appid: 'a77b6a5078a494988f7b5c9fe589e431', q: cityName, cnt: days});
    }
}]);