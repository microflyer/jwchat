'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('addBuddy', ['', function() {
    return {
        restrict: 'E',
        replace: true,
        template: '<button type="button" class="btn btn-default btn-block">Add Buddy</button>',
        link: function(scope, elem, attrs) {

        }
    };
  }]).
  directive('removeBuddy', ['', function(){
      // Runs during compile
      return {
           restrict: 'E',
           template: '<button type="button" class="btn btn-default btn-block">Remove Buddy</button>',
           replace: true,
           link: function($scope, iElm, iAttrs, controller) {
              
          }
      };
  }]);
