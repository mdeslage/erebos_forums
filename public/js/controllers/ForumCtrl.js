// controllers/ForumCtrl.js
var app = angular.module('forumApp');

app.controller('ForumCtrl', ForumCtrl);

ForumCtrl.$inject = ['category', '$mdDialog', '$scope'];

function ForumCtrl(category, $mdDialog) {
    var self = this;

    self.categories = category.categories;

    self.toDateString = function(date) {
        var newDate = new Date(date);
        return newDate.toLocaleDateString() + ' ' + newDate.toLocaleTimeString();
    }

    function AddCategoryController($scope, $mdDialog, category) {

        $scope.name = "";
        $scope.permission_level = "";
        $scope.perms = [
            {
                number: 1,
                rank: 'Member'
            },
            {
                number: 2,
                rank: 'Officer'
            },
            {
                number: 3,
                rank: 'Admin'
            }
        ];

        $scope.hide = function () {
            $scope.name = '';
            $scope.permission_level = '';
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $scope.name = '';
            $scope.permission_level = '';
            $mdDialog.cancel();
        };

        $scope.createCategory = function () {

            if($scope.name === '') { return; }

            category.addCategory({
                name: $scope.name,
                permission_level: $scope.permission_level,
                recentThreads: []
            });

            $scope.name = '';
            $scope.permission_level = '';
            $mdDialog.hide();
        };
        
    };

    self.showAddCategory = function (ev) {
        $mdDialog.show({
            controller: AddCategoryController,
            clickOutsideToClose: true,
            template:
            '<md-dialog flex="80" flex-xs="90" flex-lg="60" flex-xl="50">' +
            '<md-content class="md-padding">' +
            '<span class="md-headline">New Category</span>' +
            '<md-divider></md-divider><br></br>' +
            '<form name="newCategoryForm">' +
            '<md-input-container class="md-block">' +
            '<label>Name</label>' +
            '<input ng-model="name" required md-no-asterisk name="name" autocomplete="off">' +
            '<div ng-messages="newCategoryForm.name.$error">' +
            '<div ng-message="required">This is required.</div>' +
            '<!--<div ng-message="minlength">Title must be greater than 10 characters.</div>-->' +
            '</div>' +
            '</md-input-container>' +
            '<md-input-container class="md-block">' +
            '<label>Permission Level</label>' +
            '<md-select ng-model="permission_level">' +
            '<md-option ng-repeat="perm in perms" ng-value="perm.number">' +
            '{{ perm.rank }}' +
            '</md-option>' +
            '</md-select>' +
            '</md-input-container>' +
            '</form>' +
            '</md-content>' +
            '<div class="md-dialog-actions" layout="row">'+
            '<span flex></span>' +
            '<md-button class="md-primary" ng-click="cancel()">Cancel</md-button>' +
            '<md-button class="md-primary md-raised" ng-click="createCategory()">Save</md-button>' +
            '</div><br></br>' +
            '</md-dialog>',
            targetEvent: ev
        });
    }
}