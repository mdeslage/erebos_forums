// controller/ThreadCtrl.js
var app = angular.module('forumApp');

app.controller('ThreadCtrl', ThreadCtrl);

ThreadCtrl.$inject = ['thread', '$stateParams', '$mdDialog', '$scope'];

function ThreadCtrl(thread, $stateParams, $mdDialog, $scope) {
    var self = this;
    var threadId = $stateParams.thread_id;

    self.thread = thread.getThread(threadId);


}