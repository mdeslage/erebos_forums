//services/thread.js
var app = angular.module('forumApp');

app.factory('thread', ['$http', 'auth', function($http, auth) {
    var obj = {
        threads: [],
        currentThread: {},
        getThreadsByCategory: function (_id) {
            return $http.get('/threads/category/' + _id).success(function(data) {
                angular.copy(data, obj.threads);
            });
        },

        addThread: function(thread) {
            return $http.post('/threads', thread, {
                headers: { Authorization: 'Bearer ' + auth.getToken() }
            }).success(function(data) {
                obj.threads.push(data);
            });
        },

        getThread: function(_id) {
            // Just get it based on the id in the array for now
            return $http.get('/threads/' + _id).success(function(data) {
                angular.copy(data, obj.currentThread);
            });
        },

        addComment: function(comment) {
            return $http.post('/comments', comment, {
                headers: { Authorization: 'Bearer ' + auth.getToken() }
            }).success(function(data) {
                obj.currentThread.comments.push(data);
            });
        }
    };

    return obj;
}])