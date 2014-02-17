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
  controller("buddyManagerCtrl", ["$rootScope", "$scope", "$timeout","userService", function($rootScope, $scope, $timeout, userService){
      
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

          // register for the change event of buddy list
          // TODO: make the user select status UI and data match
          $timeout(function() {

                userService.getBuddyIds($rootScope.auth.user.id, function(buddyIds){
                  angular.forEach(buddyIds, function(buddyId, index){
                      for (var i = 0; i < $scope.allUsersList.length; i++) {
                          // for user in alluserslist, if buddy id exists, add it to buddy list and remove it from alluserslist
                          if (buddyId == $scope.allUsersList[i].id) {
                              $scope.allUsersList.splice(i, 1);
                              userService.getUser(buddyId).then(function(user){
                                  $scope.buddyList.push(user);
                              });
                          }
                      }
                  });
                  $scope.selectedUserIds = [];

                  angular.forEach($scope.buddyList, function(buddy, index){
                        // for each buddy in buddylist, if it doesn't exist in buddyIds(server side), 
                        // we should remove it from buddy list and add it to user list
                        if (buddyIds.indexOf(buddy.id) == -1) {
                            $scope.buddyList.splice(index, 1);
                            userService.getUser(buddy.id).then(function(user){
                                $scope.allUsersList.push(user);
                            });
                        }
                    });
                    $scope.selectedBuddyIds = [];
               });

          }, 5000);
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