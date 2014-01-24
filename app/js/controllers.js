'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('HomeCtrl', [function() {

  }])
  .controller("userManagerCtrl", ["$scope", "userManagerService", function($scope, userManagerService){

    $scope.createUser = function() {
        userManagerService.createUser($scope.email, $scope.password);
    }

    $scope.login = function() {
        userManagerService.login($scope.email, $scope.password);
    }


  }]);