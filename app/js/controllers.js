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
      $scope.selectedUserIds = [];
      $scope.selectedBuddyIds = [];

      $scope.getAllUsersList = function() {
          var usersRef = userService.getUsersRef();
          usersRef.$on('loaded', function(){
              var userIds = usersRef.$getIndex();
              angular.forEach(userIds, function(userId, index) {
                if (userId != $rootScope.auth.user.id) {
                  $scope.allUsersList.push({id: userId, name: usersRef[userId].name, email: usersRef[userId].email})
                }
              });

              console.log($scope.allUsersList);       
          });
      };

      $scope.userClicked = function(userId) {

          if ($scope.selectedUserIds.indexOf(userId) == -1) {
              $scope.selectedUserIds.push(userId);
          }
          else {
              $scope.selectedUserIds.splice($scope.selectedUserIds.indexOf(userId), 1);
          }

          console.log("selectedUserIds = ");
          console.log($scope.selectedUserIds);
      };

  }]);