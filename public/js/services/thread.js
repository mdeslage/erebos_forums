//services/thread.js
var app = angular.module('forumApp');

app.factory('thread', ['$http', function($http) {
    var obj = {
        threads: [],
        currentThread: {},
        getThreadsByCategory: function (_id) {
            return $http.get('/threads/category/' + _id).success(function(data) {
                angular.copy(data, obj.threads);
            });
        },

        addThread: function(thread) {
            return $http.post('/threads', thread).success(function(data) {
                obj.threads.push(data);
            });
        },

        getThread: function(_id) {
            // Just get it based on the id in the array for now
            return $http.get('/threads/' + _id).success(function(data) {
                console.log(data);
                angular.copy(data, obj.currentThread);
            });
        },

        addComment: function(thread, comment) {
            obj.testThreads[thread._id].comments.push(comment);
        }



    };

    return obj;
}])