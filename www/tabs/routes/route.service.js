(function() {
  'use strict';

  angular.module('starter.services')
    .factory('RouteService', RouteService);

  RouteService.$inject = ["$log", "$q"];

  function RouteService($log, $q) {

    function getDirections(origin, destination) {

        var defer = $q.defer();
        var directionsService = new google.maps.DirectionsService;
        directionsService.route({
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: true
        }, function(response, status) {
          if (status === google.maps.DirectionsStatus.OK) {
            defer.resolve(response);
          } else {
            $log.log("Error in retrieving directions");
            defer.reject(response);
          }
        });
        return defer.promise;

    }

    function setRoute(route) {
      this.route = route;
    }

    function getRoute() {
      return this.route;
    }

    return {
      setRoute: setRoute,
      getRoute: getRoute,
      getDirections: getDirections
    }

  }
}());
