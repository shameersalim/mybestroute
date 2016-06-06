angular.module('starter.controllers')

.controller('RouteDetailController', RouteDetailController);

RouteDetailController.$inject = ['$rootScope', '$scope', '$log', 'RouteService'];
function RouteDetailController($rootScope, $scope, $log, RouteService) {
  $scope.$on('$ionicView.enter', function(e) {
        var route = RouteService.getRoute();
        $scope.listOfSteps = route.legs[0].steps;
      });
};

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
