angular.module('myApp', [
        'so.modal'
    ]).

    // typically you'll inject the modal service into its own
    // controller so that the modal can close itself
    controller('MyModalCtrl', ['Modal', function (Modal) {

        var ctrl = this;

        ctrl.tickCount = 5;

        ctrl.closeMe = function () {
            Modal.close();
        };

        ctrl.select = function(param) {
            ctrl.selected = param;
            Modal.success(ctrl.selected);
        };

        //ctrl.template=Modal.template;
    }])

    .controller('NestedCtrl', ['Modal', function(Modal) {
        var ctrl = this;

        ctrl.select = function(param) {
            Modal.success(param);
        };

    }])

    .controller('MyCtrl', ['Modal', function (Modal) {
        var ctrl = this;

        ctrl.setSelected = function(item) {
            ctrl.selected = item;
        };

        ctrl.showModal = function() {
            Modal.open({
                controller:   'MyModalCtrl',
                controllerAs: 'modalCtrl',
                onSuccess:    ctrl.setSelected,
                templateUrl:  'src/modal.html',
                esc:          true
            });
        };

    }]);