'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('HomeCtrl', [function() {

  }]).
  controller("userManagerCtrl", ["$scope", "userManagerService", function($scope, userManagerService){

        $scope.userInfo = {};
        $scope.userInfo.email = "";
        $scope.userInfo.password = "";
        $scope.userInfo.displayName = "";
        $scope.userInfo.confirmPassword = "";

        $scope.createUser = function() {

            $scope.warningMessages = [];

            if ($scope.userInfo.displayName && $scope.userInfo.email &&
                $scope.userInfo.password && $scope.userInfo.confirmPassword){
                if ($scope.userInfo.password  !== $scope.userInfo.confirmPassword) {
                    $scope.warningMessages.push("You should input the same password!");
                }
                else {
                    userManagerService.createUser($scope.userInfo.email, $scope.userInfo.password).then(
                        function(user) {
                            console.log("User was created successfully!");
                            console.log(user);
                        },
                        function(err) {
                            $scope.warningMessages.push(err.message);
                        }
                    );
                }
            }
        }

        $scope.login = function() {

            $scope.warningMessages = [];

            userManagerService.login($scope.userInfo.email, $scope.userInfo.password).then(
                function(user) {
                    console.log("User was login successfully!");
                    console.log(user);
                },
                function(err){
                    $scope.warningMessages.push(err.message);
                }
            );
        }

  }]);