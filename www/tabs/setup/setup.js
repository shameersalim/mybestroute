angular.module('starter.controllers')

.controller('SetupController', SetupController);

SetupController.$inject = ['$rootScope', '$scope', '$log', '$cordovaLocalNotification', '$ionicPlatform',
  'SaveService'
];

function SetupController($rootScope, $scope, $log, $cordovaLocalNotification, $ionicPlatform,
  SaveService) {

  if ($rootScope.setup === null || angular.isUndefined($rootScope.setup)) {
    $rootScope.setup = {
      temperatureFormat: 'farenheit',
      morningNotificationTime: '',
      eveningNotificationTime: '',
      fromAddress: '',
      toAddress: '',
      fromLabel: 'Home',
      toLabel: 'Work'
    };
    saveData();

  }

  function dispatchTemperatureChangeEvent() {

  };

  $scope.notifyMe = function() {
    $scope.scheduleNotificationFiveSecondsFromNow();
  };

  $scope.rbTempChangeHandler = function(tempFormat) {
    $rootScope.temperatureFormat = tempFormat;
    if (tempFormat === 'farenheit') {

    } else if (tempFormat === 'celsius') {

    }
    saveData();
    dispatchTemperatureChangeEvent();

  };

  function saveData() {
    SaveService.saveData($rootScope.setup);
  }

  $ionicPlatform.ready(function() {
    $scope.scheduleNotificationFiveSecondsFromNow = function() {
      var now = new Date().getTime();
      var _5SecondsFromNow = new Date(now + 10000);

      $cordovaLocalNotification.schedule({
        id: 2,
        date: _5SecondsFromNow,
        text: 'Notification After 10 Seconds Has Been Triggered',
        title: 'After 10 Seconds'
      }).then(function() {
        alert("Notification After 10 seconds set");
      });
    };
  });
};

// With the new view caching in Ionic, Controllers are only called
// when they are recreated or on app start, instead of every page change.
// To listen for when this page is active (for example, to refresh data),
// listen for the $ionicView.enter event:
//$scope.$on('$ionicView.enter', function(e) {
//});
