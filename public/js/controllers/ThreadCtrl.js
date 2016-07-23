// controller/ThreadCtrl.js
var app = angular.module('forumApp');

app.controller('ThreadCtrl', ThreadCtrl);

ThreadCtrl.$inject = ['thread', '$stateParams', '$mdDialog', '$scope'];

function ThreadCtrl(thread, $stateParams, $mdDialog, $scope) {
    var self = this;
    var threadId = $stateParams.thread_id;
    var currThread = thread.getThread(threadId);

    self.thread = currThread;

    self.replies = self.thread.comments.length;

    function AddCommentController($scope, $mdDialog, thread) {

        $scope.body = '';
        $scope.title = currThread.title;
        
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

            thread.addComment(currThread, {
                body: $scope.body,
                author: 'Mike'
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
            '<span class="md-headline">Add Comment</span>' +
            '<md-divider></md-divider><br></br>' +
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