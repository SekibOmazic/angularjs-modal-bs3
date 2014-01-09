angular.module('myApp', [
        'so.modal.bs'
    ])
/*
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

    // TODO: move two following controllers out of this module
    .controller('ItemsCtrl', ['BsModal', function(Modal) {
        var ctrl = this;

        ctrl.items = ['item1', 'item2', 'item3'];

        ctrl.choose = function(param) {
            ctrl.selected = param;
        };

        ctrl.closeWithSelectedItem = function() {
            Modal.success(ctrl.selected);
        };

        ctrl.forward = function() {
            Modal.switchTo('src/extended/family-members.html');
        }
    }])


    .controller('FamilyCtrl', ['BsModal', function(Modal) {
        var ctrl = this;

        ctrl.members = ['Sekib', 'Almira', 'Alan', 'Arian'];

        ctrl.choose = function(param) {
            ctrl.selected = param;
        };

        ctrl.closeWithSelectedFamilyMember = function() {
            Modal.success(ctrl.selected);
        };
    }]);
*/