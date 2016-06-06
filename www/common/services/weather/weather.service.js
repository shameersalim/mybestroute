(function() {
  "use strict";

  angular.module("starter.services").factory("WeatherService", WeatherService);

  WeatherService.$inject = ["$log", "$http", "$q"];

  function WeatherService($log, $http, $q) {
    var getWeather = function(apiKey, url, params) {
      return $http.jsonp(url, {
          params: params
        })
        .then(function(response) {
          if (typeof response.data === 'object') {
            return response.data;
          } else {
            return $q.reject(response.data);
          }
        }, function(response) {
          return $q.reject(response.data);
        });

    };

    var convertTemperature = function(temp, celsiusToFarenheit) {
      var result;
      if(celsiusToFarenheit) {
        result = (temp * 1.8) + 32;
      } else {
        result = (temp - 32) / 1.8;
      }
      return result;
    };

    return {
      getWeather : getWeather,
      convertTemperature : convertTemperature
    };


  }
}());
