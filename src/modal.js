'use strict';

angular.module('so.modal', []).
    factory('Modal', function ($document, $compile, $rootScope, $controller, $q, $http, $templateCache) {

        var element = null,
            backdropEl = null,
            successFn = null,
            esc;

        function removeElements() {
            if (element) {
                element.remove();
                element = null;
            }
            if (backdropEl) {
                backdropEl.remove();
                backdropEl = null;
            }
        }

        function dismiss(evt) {
            if (evt.currentTarget === evt.target) {
                evt.preventDefault();
                evt.stopPropagation();
                removeElements();
            }
        }

        $document.bind('keydown', function (evt) {
            if (evt.which === 27) {

                if (esc && element) {
                    $rootScope.$apply(function () {
                        removeElements();
                    });
                }
            }
        });

        return {

            open: function (config) {

                if ((+!!config.template) + (+!!config.templateUrl) !== 1) {
                    throw new Error('Expected modal to have exacly one of either `template` or `templateUrl`');
                }

                var template      = config.template,
                    controller    = config.controller || angular.noop,
                    controllerAs  = config.controllerAs,
                    container     = angular.element(config.container || document.body),
                    backdrop      = config.backdrop || true,
                    backdropClass = config.backdropClass || 'modal-backdrop fade in',
                    html;

                // callback function
                successFn         = config.onSuccess || angular.noop;

                // close modal on esc
                esc               = config.esc || false;

                if (config.template) {
                    var deferred = $q.defer();
                    deferred.resolve(config.template);
                    html = deferred.promise;
                }
                else {
                    html = $http.get(config.templateUrl, {
                            cache: $templateCache
                        })
                        .then(function (response) {
                            return response.data;
                        });
                }

                html.then(function (html) {
                    attach(html);
                });

                function wrapInBootstrapModal(html) {
                    return '<div class="modal fade in" style="display:block; " ng-click="$close($event)"><div class="modal-dialog"><div class="modal-content">' +
                        html +
                        '</div></div></div>';
                }

                function attach (html) {
                    var wrapped = wrapInBootstrapModal(html);

                    element = angular.element(wrapped);

                    container.prepend(element);
                    var scope = $rootScope.$new();

                    var ctrl = $controller(controller, { $scope: scope });

                    if (controllerAs) {
                        scope[controllerAs] = ctrl;
                        ctrl.$close = dismiss;
                    }
                    //else {
                        scope.$close = dismiss;
                    //}

                    $compile(element)(scope);

                    // backdrop
                    if (backdrop) {
                        var backdropJqLiteEl = angular.element('<div></div>');
                        backdropJqLiteEl.addClass(backdropClass);
                        var backdropScope = $rootScope.$new(true);
                        backdropEl = $compile(backdropJqLiteEl)(backdropScope);
                        container.append(backdropEl);
                    }

                }

            },

            close: function() {
                removeElements();
            },

            success: function(result) {
                successFn(result);
                removeElements();
            }

        };
    });
