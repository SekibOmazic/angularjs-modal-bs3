angular.module('myApp', [
        'so.modal',
        'so.modal.bs'
    ]).

    // Version 1

    // modal injected into its own controller so that the modal can close itself
    controller('MyModalCtrl', ['Modal', function (Modal) {

        var ctrl = this;

        ctrl.items = ['item1', 'item2', 'item3'];

        ctrl.closeMe = function () {
            Modal.close();
        };

        ctrl.select = function(param) {
            ctrl.selected = param;
        };

        ctrl.closeWithSelected = function() {
            Modal.success(ctrl.selected);
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

    }])



    // Version 2

    .controller('MainCtrl', ['BsModal', function (Modal) {
        var ctrl = this;

        ctrl.setSelected = function(item) {
            ctrl.selected = item;
        };

        ctrl.showModal = function() {
            Modal.open({
                onSuccess:    ctrl.setSelected,
                templateUrl:  'src/extended/items.html',
                esc:          true
            });
        };

    }])
    .controller('ItemsCtrl', ['BsModal', function(Modal) {
        var ctrl = this;

        ctrl.items = ['item1', 'item2', 'item3'];

        ctrl.choose = function(param) {
            ctrl.selected = param;
        };

        ctrl.closeDialog = function() {
            Modal.close();
        };

        ctrl.closeWithSelectedItem = function() {
            Modal.success(ctrl.selected);
        };

        ctrl.forward = function() {
            Modal.next('src/extended/family-members.html');
        }
    }])


    .controller('FamilyCtrl', ['BsModal', function(Modal) {
        var ctrl = this;

        ctrl.members = ['Sekib', 'Almira', 'Alan', 'Arian'];

        ctrl.choose = function(param) {
            ctrl.selected = param;
        };

        ctrl.closeDialog = function() {
            Modal.close();
        };

        ctrl.closeWithSelectedFamilyMember = function() {
            Modal.success(ctrl.selected);
        };

        ctrl.back = function() {
            Modal.back();
        }
    }]);