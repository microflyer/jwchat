'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('NavigationCtrl', ["$rootScope", "$scope", "$firebase", 'FBURL', 'userService', function($rootScope, $scope, $firebase, FBURL, userService) {
        $rootScope.$on("$firebaseSimpleLogin:login", function(e, user) {
            $scope.isLoggedIn = true;
            $scope.userRef = userService.getUserRef(user.id);
        });


        $scope.isLoggedIn = false;

        $scope.logout = function() {
            $rootScope.auth.$logout();
            $scope.isLoggedIn = false;
        }


  }]).
  controller('HomeCtrl', [function() {

  }]).
  controller("userManagerCtrl", ["$scope", "$location" , "userManagerService", function($scope, $location, userManagerService){

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
                            console.log("User Profile: " + $scope.userInfo.displayName + " " + $scope.userInfo.email);
                            userManagerService.createUserProfile(user.id, $scope.userInfo.displayName, $scope.userInfo.email)
                            $location.path('/');
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
                    $location.path('/');
                },
                function(err){
                    $scope.warningMessages.push(err.message);
                }
            );
        }

  }]).
  controller("buddyManagerCtrl", ["$rootScope", "$scope", "userService", function($rootScope, $scope, userService){
      
      $scope.allUsersList = [];
      $scope.buddyList = [];
      $scope.selectedUserIds = [];
      $scope.selectedBuddyIds = [];

      $scope.loadInitialData = function() {
          var usersRef = userService.getAllUsers().then(function(users) {
              userService.getBuddyIds($rootScope.auth.user.id).then(function(buddyIds){

                  console.log("Buddy ID changed in controller!");
                  angular.forEach(users, function(user, index) {
                      if (user.id != $rootScope.auth.user.id && buddyIds.indexOf(user.id) == -1) {
                          $scope.allUsersList.push(user);
                      }
                  });

                  angular.forEach(buddyIds, function(buddyId, index){
                      userService.getUser(buddyId).then(function(user){
                          $scope.buddyList.push(user);
                      });
                  });
              });
          });
      };

      $scope.userClicked = function(userId) {

          if ($scope.selectedUserIds.indexOf(userId) == -1) {
              $scope.selectedUserIds.push(userId);
          }
          else {
              $scope.selectedUserIds.splice($scope.selectedUserIds.indexOf(userId), 1);
          }
      };

      $scope.buddyClicked = function(buddyId) {

          if ($scope.selectedBuddyIds.indexOf(buddyId) == -1) {
              $scope.selectedBuddyIds.push(buddyId);
          }
          else {
              $scope.selectedBuddyIds.splice($scope.selectedBuddyIds.indexOf(buddyId), 1);
          }

          console.log($scope.selectedBuddyIds);
      };

  }]);