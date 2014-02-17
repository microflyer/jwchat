'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('addBuddy', ['$rootScope', 'userService', function($rootScope ,userService) {
    return {
        restrict: 'E',
        replace: true,
        scope: false,
        template: '<button type="button" class="btn btn-default btn-block">Add Buddy</button>',
        link: function(scope, elem, attrs) {
            $(elem).on("click", function(){
                angular.forEach(scope.selectedUserIds, function(value, key){
                     userService.addBuddy($rootScope.auth.user.id, value);
                     // the buddy should also have the current user in their buddy list
                     userService.addBuddy(value, $rootScope.auth.user.id);
                 });
                userService.getBuddyIds($rootScope.auth.user.id, function(buddyIds){
                  angular.forEach(buddyIds, function(buddyId, index){
                      for (var i = 0; i < scope.allUsersList.length; i++) {
                          // for user in alluserslist, if buddy id exists, add it to buddy list and remove it from alluserslist
                          if (buddyId == scope.allUsersList[i].id) {
                              scope.allUsersList.splice(i, 1);
                              userService.getUser(buddyId).then(function(user){
                                  scope.buddyList.push(user);
                              });
                          }
                      }
                  });
                  scope.selectedUserIds = [];
              });
            });
        }
    };
  }]).
  directive('removeBuddy', ['$rootScope', 'userService', function($rootScope ,userService) {
      return {
           restrict: 'E',
           template: '<button type="button" class="btn btn-default btn-block">Remove Buddy</button>',
           replace: true,
           link: function(scope, elem, attrs) {
             $(elem).on("click", function(){
                angular.forEach(scope.selectedBuddyIds, function(value, key){
                     userService.removeBuddy($rootScope.auth.user.id, value);
                     // the buddy should also remove the current user in their buddy list
                     userService.removeBuddy(value, $rootScope.auth.user.id);
                 });

                userService.getBuddyIds($rootScope.auth.user.id, function(buddyIds){
                    angular.forEach(scope.buddyList, function(buddy, index){
                        // for each buddy in buddylist, if it doesn't exist in buddyIds(server side), 
                        // we should remove it from buddy list and add it to user list
                        if (buddyIds.indexOf(buddy.id) == -1) {
                            scope.buddyList.splice(index, 1);
                            userService.getUser(buddy.id).then(function(user){
                                scope.allUsersList.push(user);
                            });
                        }
                    });
                    scope.selectedBuddyIds = [];
                });
            })             
          }
      };
  }]);
