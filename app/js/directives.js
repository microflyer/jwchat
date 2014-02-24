'use strict';

/* Directives */


angular.module('myApp.directives', []).
directive('assignmentModal', ['$compile', '$http', '$templateCache',
    function ($compile, $http, $templateCache) {
        return {
            restrict: 'A',
            scope: {
                assignment : '='
            },
            replace: false,
            link: function (scope, elem, attr) {

                var $modalElement;

                $http.get('partials/modal-content.html', {
                    cache: $templateCache
                })
                    .success(function (htmlToAdd) {
                        if (!elem.attr('compiled')) {
                            elem.attr('compiled', "true");

                            var modalHtmlBefore = '<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="assignmentModal" aria-hidden="true">';
                            modalHtmlBefore += '<div class="modal-dialog"><div class="modal-content"><div class="modal-body">';
                            var modalHtmlAfter = '</div></div></div></div>';

                            var modalHtml = modalHtmlBefore + htmlToAdd + modalHtmlAfter;
                            $modalElement = $compile(modalHtml)(scope);
                            $modalElement.find('.modal-dialog').css("width", "850px");
                            $modalElement.find('.modal-body').css("height", "800px");

                            elem.on('click', function () {
                                $modalElement.modal('show');
                            });
                        }
                    });

                scope.close = function() {
                    $modalElement.modal('hide');
                }
            }
        };
    }
]);