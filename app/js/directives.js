'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('addBuddy', [function() {
    return {
        restrict: 'E',
        replace: true,
        scope: false,
        template: '<button type="button" class="btn btn-default btn-block">Add Buddy</button>',
        link: function(scope, elem, attrs) {
            $(elem).on("click", function(){
                //alert("add buddy clicked!");
                console.log("scope:");
                console.log(scope);

            })
        }
    };
  }]).
  directive('removeBuddy', [function(){
      // Runs during compile
      return {
           restrict: 'E',
           template: '<button type="button" class="btn btn-default btn-block">Remove Buddy</button>',
           replace: true,
           link: function(scope, elem, attrs) {
              
          }
      };
  }]);
