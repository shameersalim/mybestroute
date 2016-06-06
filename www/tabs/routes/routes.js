angular.module('starter.controllers', [])
.controller('RoutesController', RoutesController);

RoutesController.$inject = ['$rootScope', '$scope', '$log', '$state',
'RouteService', 'WeatherService', 'SaveService'];

function RoutesController($rootScope, $scope, $log, $state,
  RouteService, WeatherService, SaveService) {
  if ($rootScope.setup === null || angular.isUndefined($rootScope.setup)) {
    $rootScope.setup = {
      temperatureFormat: '',
      morningNotificationTime: '',
      eveningNotificationTime: '',
      fromAddress: '',
      toAddress: '',
      fromLabel: 'Home',
      toLabel: 'Work'
    };

    function getDirections(from, to) {
      if (from === null || to === null) {
        return;
      }

      if (angular.isUndefined(from) || angular.isUndefined(to)) {
        return;
      }

      RouteService.getDirections(from, to)
        .then(function(response) {
          $scope.listOfRoutes = response.routes;
          $scope.listOfRoutes.sort(function(a, b) {
            if (parseInt(a.legs[0].duration.text) > parseInt(b.legs[0].duration.text)) {
              return 1;
            }
            if (parseInt(a.legs[0].duration.text) < parseInt(b.legs[0].duration.text)) {
              return -1;
            }
            return 0;
          });
        }, function(response) {
          $log.log("Error in retrieving directions");
        });
        saveData();
    };

    $scope.fromAddressSelectHandler = function(place) {
      $rootScope.setup.fromAddress = place.formatted_address;
      getDirections($rootScope.setup.fromAddress, $rootScope.setup.toAddress);
    };

    $scope.toAddressSelectHandler = function(place) {
      $rootScope.setup.toAddress = place.formatted_address;
      getDirections($rootScope.setup.fromAddress, $rootScope.setup.toAddress);
    };

    $scope.switchDirections = function() {
      var temp = $rootScope.setup.fromAddress;
      $rootScope.setup.fromAddress = $rootScope.setup.toAddress;
      $rootScope.setup.toAddress = temp;
      if ($rootScope.setup.fromLabel == 'Home' && $rootScope.setup.toLabel == 'Work') {
        $rootScope.setup.fromLabel = 'Work';
        $rootScope.setup.toLabel = 'Home';
      } else {
        $rootScope.setup.fromLabel = 'Home';
        $rootScope.setup.toLabel = 'Work';
      }
      getDirections($rootScope.setup.fromAddress, $rootScope.setup.toAddress);
      getWeather();
    };

    function getWeather() {
          var apiKey = 'dff13526e6fd3e06e534646075eeb74d';
          var url = "http://api.openweathermap.org/data/2.5/weather";
          var params = {
            zip: '28211,us',
            apikey: apiKey,
            units: 'imperial',
            callback: 'JSON_CALLBACK'
          };
          WeatherService.getWeather(apiKey, url, params)
            .then(function(data) {
              $log.log("success : Weather");
              $scope.temperature = data.main.temp;
              $scope.weatherObj = data.weather[0];
              $scope.tempDescription = $scope.weatherObj.description;
              $scope.imgSource = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
            }, function(error) {
              $log.log("errors : Weather");
            });
            saveData();
        }

    function saveData() {
      SaveService.saveData($rootScope.setup);
    }

    $scope.showRouteDetails = function(route) {
      RouteService.setRoute(route);
      $state.go('app.single');
    };

    $scope.getClass = function(index) {
      if (index === 0) {
        return 'best-route';
      }
    };

    getWeather();
    getDirections();
  }
};

// With the new view caching in Ionic, Controllers are only called
// when they are recreated or on app start, instead of every page change.
// To listen for when this page is active (for example, to refresh data),
// listen for the $ionicView.enter event:
//$scope.$on('$ionicView.enter', function(e) {
//});
