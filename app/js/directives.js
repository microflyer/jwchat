'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('addBuddy', ['$rootScope', 'userService', 'chatService', function($rootScope ,userService, chatService) {
    return {
        restrict: 'E',
        replace: true,
        scope: false,
        template: '<button type="button" class="btn btn-default btn-block">Add Buddy</button>',
        link: function(scope, elem, attrs) {
            $(elem).on("click", function(){
                angular.forEach(scope.selectedUserIds, function(value, key){

                    chatService.createChannel($rootScope.auth.user.id, value).then(function(channelId){
                        userService.addBuddy($rootScope.auth.user.id, value, channelId);
                        // the buddy should also have the current user in their buddy list
                        userService.addBuddy(value, $rootScope.auth.user.id, channelId);
                    });


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
            })             
          }
      };
  }]);
