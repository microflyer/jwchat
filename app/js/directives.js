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
                                $(elem).find('.modal').modal('show');
                                $(elem).off('click');
                            });

                            var htmlContent = $(elem).html();
                            var modalHtmlBefore = '<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
                            modalHtmlBefore += '<div class="modal-dialog"><div class="modal-content"><div class="modal-body">';
                            var modalHtmlAfter = '</div></div></div></div>';

                            $(elem).html(htmlContent + modalHtmlBefore + htmlToAdd + modalHtmlAfter);

                            $(elem).find('.modal-dialog').css("width", "850px");
                            $(elem).find('.modal-body').css("height", "800px");

                            $(elem).find('.modal').on('hidden.bs.modal', function (e) {
                                $(elem).on('click', function () {
                                    $(elem).find('.modal').modal('show');
                                    $(elem).off('click');
                                });
                            });

                            $compile(elem)(scope);
                        }
                    });
            }
        };
    }
]);