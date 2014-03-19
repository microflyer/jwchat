'use strict';

/* Directives */


angular.module('myApp.directives', [])
    .directive('assignmentModal', ['$compile', '$http', '$templateCache',
        function ($compile, $http, $templateCache) {
            return {
                restrict: 'A',
                scope: {
                    assignment: '='
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

                    scope.close = function () {
                        $modalElement.modal('hide');
                    }
                }
            };
        }
    ])
    .directive('textPopover', [

        function () {
            return {
                restrict: 'A',
                scope: {
                    text: '@'
                },
                replace: false,
                link: function (scope, elem, attrs) {
                    var options = {
                        animation: true,
                        html: false,
                        trigger: 'mannual',
                        placement: 'right',
                        content: scope.text
                        //container: 'body'
                    };

                    elem.on('click', function () {
                        $(elem).popover(options);
                        $(elem).popover('toggle');
                    });

                    $('body').on('click', function (e) {
                        $('[data-toggle="popover"]').each(function () {
                            //the 'is' for buttons that trigger popups
                            //the 'has' for icons within a button that triggers a popup
                            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                                $(this).popover('hide');
                            }
                        });
                    });
                }
            }
        }
    ])
    .directive('jwTypeahead', [

        function () {
            return {
                restrict: 'A',
                replace: false,
                link: function (scope, elem, attrs) {
                    var substringMatcher = function (strs) {
                        return function findMatches(q, cb) {
                            var matches, substringRegex;

                            // an array that will be populated with substring matches
                            matches = [];

                            // regex used to determine if a string contains the substring `q`
                            substringRegex = new RegExp(q, 'i');

                            // iterate through the pool of strings and for any string that
                            // contains the substring `q`, add it to the `matches` array
                            $.each(strs, function (i, str) {
                                if (substringRegex.test(str)) {
                                    // the typeahead jQuery plugin expects suggestions to a
                                    // JavaScript object, refer to typeahead docs for more info
                                    matches.push({
                                        value: str
                                    });
                                }
                            });

                            cb(matches);
                        };
                    };

                    var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
                        'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
                        'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
                        'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
                        'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
                        'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
                        'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
                        'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
                        'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
                    ];

                    $(elem).typeahead({
                        hint: true,
                        highlight: true,
                        minLength: 1
                    }, {
                        name: 'states',
                        displayKey: 'value',
                        source: substringMatcher(states)
                    });
                }
            };
        }
    ]);