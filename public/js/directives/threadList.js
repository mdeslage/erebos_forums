// components/threadList.js
var app = angular.module('forumApp');

ThreadListController.$inject = ['$state'];

function ThreadListController($state) {
    var self = this;

    self.getImagePath = function(uname) {
        return '/img/name-icons/' + uname.charAt(0).toUpperCase() + '.png';
    }

    self.goToThread = function(cat_id, thread_id) {
        $state.go('thread', {
            id: cat_id,
            thread_id: thread_id
        });
    }
}

app.component('threadList', {
    templateUrl: '../../views/threadList.html',
    controller: ThreadListController,
    bindings: {
        threads: '='
    }
})