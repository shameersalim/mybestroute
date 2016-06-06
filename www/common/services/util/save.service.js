(function() {
  "use strict";

  angular.module("starter.services").factory("SaveService", SaveService);

  SaveService.$inject = ["$log", "$http", "$q"];

  function SaveService($log, $http, $q) {
    function saveData(data) {
      var setupStr = JSON.stringify(data);
      window.localStorage.setItem("setup", setupStr);
    };

    function getData() {
      var setupStr = window.localStorage.getItem("setup");
      var setup = JSON.parse(setupStr);
      return setup;
    }

    return {
      saveData : saveData,
      getData : getData
    };


  }
}());
