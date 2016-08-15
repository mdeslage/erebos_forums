// controller/ThreadCtrl.js
var app = angular.module('forumApp');

app.controller('ThreadCtrl', ThreadCtrl);

ThreadCtrl.$inject = ['thread', '$stateParams', '$mdDialog', '$scope', 'auth'];

function ThreadCtrl(thread, $stateParams, $mdDialog, $scope, auth) {
    var self = this;
    var threadId = $stateParams.thread_id;
    self.currThread = thread.currentThread;

    self.replies = self.currThread.comments.length;
    self.replyText = "";

    self.getImagePath = function(uname) {
        return '/img/name-icons/' + uname.charAt(0).toUpperCase() + '.png';
    }

    function AddCommentController($scope, $mdDialog, thread) {

        $scope.body = '';
        $scope.title = self.currThread.title;
        
        $scope.hide = function () {
            $scope.body = '';
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $scope.body = '';
            $mdDialog.cancel();
        };

        $scope.addComment = function() {
            if($scope.body === '') { return; }

            thread.addComment({
                body: $scope.body,
                author: auth.currentUser()._id,
                thread: self.currThread._id
            });

            $scope.body = '';
            $mdDialog.hide();
            self.replies++;
        };
    };

    self.showAddComment = function(ev) {
        $mdDialog.show({
            controller: AddCommentController,
            clickOutsideToClose: true,
            template:
            '<md-dialog flex="80" flex-xs="90" flex-lg="60" flex-xl="50">' +
            '<md-content class="md-padding">' +
            '<p class="md-headline">Add Comment</p>' +
            '<form name="newCommentForm">' +
            '<md-input-container class="md-block">' +
            '<label>Thread</label>' +
            '<input ng-model="title" disabled>' +
            '</md-input-container>' +
            '<md-input-container class="md-block">' +
            '<label>Comment Body</label>' +
            '<textarea ng-model="body" md-maxlength="1000" rows="7" md-select-on-focus></textarea>' +
            '</md-input-container>' +
            '</form>' +
            '</md-content>' +
            '<div class="md-dialog-actions" layout="row">'+
            '<span flex></span>' +
            '<md-button ng-click="cancel()">Cancel</md-button>' +
            '<md-button class="md-primary" ng-click="addComment()">Save</md-button>' +
            '</div><br></br>' +
            '</md-dialog>',
            targetEvent: ev
        });
    }
}