'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('firstController', ['$scope', function($scope) {
    $scope.assignment = {
        id: 1,
        name: "Destroy the world"
    }
  }])
  .controller('MyCtrl2', [function() {

  }]);