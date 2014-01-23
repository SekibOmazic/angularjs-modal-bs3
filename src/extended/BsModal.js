'use strict';

angular.module('so.modal.bs', []).
    factory('BsModal', function ($document, $compile, $rootScope, $controller) {

        var element = null,
            backdropEl = null,
            successFn = null,
            esc,
            //currentTemplate,
            templateStack = [],
            opened = false;

        function removeElements() {
            if (element) {
                element.remove();
                element = null;
            }
            if (backdropEl) {
                backdropEl.remove();
                backdropEl = null;
            }

            templateStack.length = 0;
            opened = false;
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
            // TODO: change this later
            currentTemplate: { url: ''},

            open: function (config) {

                if (opened) {
                    return;
                }

                if ((+!!config.template) + (+!!config.templateUrl) !== 1) {
                    throw new Error('Expected modal to have exactly one of either `template` or `templateUrl`');
                }

                var controller    = 'ModalCtrl',
                    container     = angular.element(config.container || document.body),
                    backdrop      = config.backdrop || true,
                    backdropClass = config.backdropClass || 'modal-backdrop fade in',
                    html;

                // callback function
                successFn         = config.onSuccess || angular.noop;

                // close modal on esc
                esc               = config.esc || false;

                this.currentTemplate.url = config.templateUrl;

                var tmpl = '<div class="modal fade in" style="display:block; " ng-click="$dismiss($event)">' +
                    '<div class="modal-dialog">' +
                    '<div class="modal-content" ng-include="template.url">' +
                    '</div></div></div>';

                element = angular.element(tmpl);

                container.prepend(element);

                var scope = $rootScope.$new(true);

                $controller(controller, { $scope: scope });

                scope.$dismiss = dismiss;


                $compile(element)(scope);

                // backdrop
                if (backdrop) {
                    var backdropJqLiteEl = angular.element('<div></div>');
                    backdropJqLiteEl.addClass(backdropClass);
                    var backdropScope = $rootScope.$new(true);
                    backdropEl = $compile(backdropJqLiteEl)(backdropScope);
                    container.append(backdropEl);
                }

                templateStack.push(config.templateUrl);
                opened = true;
            },

            close: function() {
                removeElements();
            },

            next: function(template) {
                this.currentTemplate.url = template;
                templateStack.push(template);
            },

            back: function() {
                if (templateStack.length > 1) {
                    this.currentTemplate.url = templateStack[templateStack.length-2];
                    templateStack.pop();
                }
            },

            success: function(result) {
                successFn(result);
                removeElements();
            }

        };
    })
    .// modal injected into its own controller so that the modal can close itself
    controller('ModalCtrl', ['$scope', 'BsModal', function ($scope, Modal) {

        var ctrl = this;

        $scope.template = Modal.currentTemplate;

        ctrl.template= $scope.template;

/*
        function dismiss() {
            Modal.close();
        }

        function close(param) {
            Modal.success(param);
        }
*/
        //ctrl.$dismiss   = dismiss;
        //ctrl.$close     = close;

        // THIS CAUSES circular dependency. WHY????
        //$scope.$dismiss = dismiss;
        //$scope.$close   = close;

    }]);
