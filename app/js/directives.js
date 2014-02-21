'use strict';

/* Directives */


angular.module('myApp.directives', []).
directive('assignmentModal', ['$compile', '$http', '$templateCache',
  function ($compile, $http, $templateCache) {
    return {
      restrict: 'A',
      scope: {
        assignment: '='
      },
      //templateUrl: 'partials/modal-content.html',
      replace: false,
      link: function (scope, elem, attr) {

        $http.get('partials/modal-content.html', {
          cache: $templateCache
        })
          .success(function (htmlToAdd) {
            if (!$(elem).attr('compiled')) {
              $(elem).attr('compiled', "true");

              $(elem).on('click', function () {
                $('#myModal').modal('show');
                console.log("show the modal");
                $(elem).off('click');
              });

              $('#myModal').on('hidden.bs.modal', function (e) {
                console.log("modal is hidden!");
                $(elem).on('click', function () {
                  $('#myModal').modal('show');
                });
              });

              var htmlContent = $(elem).html();
              //var htmlToAdd = '{{assignment.name}}';
              $(elem).html(htmlContent + htmlToAdd);

              $compile(elem)(scope);
            }
          });




      }
    };
  }
]);