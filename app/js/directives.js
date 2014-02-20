'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('assignmentModal', [function() {
  	return {
  		restrict: 'A',
  		scope: false,
  		templateUrl: 'partials/modal-content.html',
  		link: function (scope, elem, attr) {

  			$(elem).on('click', function() {
  				$('#myModal').modal('show');
  			});

  		}
  	};
  }]);
