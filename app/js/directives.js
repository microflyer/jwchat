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
                 });
                userService.getBuddyIds($rootScope.auth.user.id, function(buddyIds){
                  angular.forEach(buddyIds, function(buddyId, index){
                      for (var i = 0; i < scope.allUsersList.length; i++) {
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
                 });

                userService.getBuddyIds($rootScope.auth.user.id, function(buddyIds){
                    angular.forEach(scope.buddyList, function(buddy, index){
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
