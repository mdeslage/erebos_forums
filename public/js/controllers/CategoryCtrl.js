//controller/CategoryCtrl.js
var app = angular.module('forumApp');

app.controller('CategoryCtrl', CategoryCtrl);

CategoryCtrl.$inject = ['thread', 'category', '$stateParams', '$mdDialog', '$scope', 'auth'];

function CategoryCtrl(thread, category, $stateParams, $mdDialog, $scope, auth) {
    var self = this;

    var id = $stateParams.id;

    self.threads = thread.threads;
    self.category = category.getCategory(id);

    self.noThreads = function() {
        return self.threads.length === 0;
    }

    self.toDateString = function(date) {
        var newDate = new Date(date);
        return newDate.toLocaleDateString() + ' ' + newDate.toLocaleTimeString();
    }

    var catName = self.category.name;

    function AddThreadController($scope, $mdDialog, thread) {
        
        $scope.title = '';
        $scope.body = '';
        $scope.catName = catName;

        $scope.hide = function () {
            $scope.title = '';
            $scope.body = '';
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $scope.title = '';
            $scope.body = '';
            $mdDialog.cancel();
        };

        $scope.createThread = function () {

            if($scope.body === '') { return; }

            var user = auth.currentUser()._id;

            thread.addThread({
                title: $scope.title,
                author: user,
                body: $scope.body,
                category: id,
                comments: []
            });

            $scope.title = '';
            $scope.body = '';
            $mdDialog.hide();
        };
    };

    self.showAddThread = function (ev) {
        $mdDialog.show({
            controller: AddThreadController,
            clickOutsideToClose: true,
            template:
            '<md-dialog flex="80" flex-xs="90" flex-lg="60" flex-xl="50">' +
            '<md-content class="md-padding">' +
            '<span class="md-headline">New Thread</span>' +
            '<md-divider></md-divider><br></br>' +
            '<form name="newThreadForm">' +
            '<md-input-container class="md-block">' +
            '<label>Category</label>' +
            '<input ng-model="catName" disabled>' +
            '</md-input-container>' +
            '<md-input-container class="md-block">' +
            '<label>Title</label>' +
            '<input ng-model="title" required md-no-asterisk name="title" autocomplete="off">' +
            '<div ng-messages="newThreadForm.title.$error">' +
            '<div ng-message="required">This is required.</div>' +
            '<!--<div ng-message="minlength">Title must be greater than 10 characters.</div>-->' +
            '</div>' +
            '</md-input-container>' +
            '<md-input-container class="md-block">' +
            '<label>Thread Body</label>' +
            '<textarea ng-model="body" md-maxlength="1000" rows="7" md-select-on-focus></textarea>' +
            '</md-input-container>' +
            '</form>' +
            '</md-content>' +
            '<div class="md-dialog-actions" layout="row">'+
            '<span flex></span>' +
            '<md-button class="md-primary" ng-click="cancel()">Cancel</md-button>' +
            '<md-button class="md-primary md-raised" ng-click="createThread()">Save</md-button>' +
            '</div><br></br>' +
            '</md-dialog>',
            targetEvent: ev
        });
    }

}