//services/thread.js
var app = angular.module('forumApp');

app.factory('thread', ['$http', function($http) {
    var obj = {
        threads: [],
        testThreads: [
            {
                title: 'This is a General test thread',
                author: 'Mike',
                created: Date.now(),
                category: 0,
                lastCommentAuthor: 'Mike',
                lastCommentDate: Date.now(),
                replies: 5,
                views: 5
            },
            {
                title: 'This is another General test thread',
                author: 'Mike',
                created: Date.now(),
                category: 0,
                lastCommentAuthor: 'Mike',
                lastCommentDate: Date.now(),
                replies: 5,
                views: 5
            },
            {
                title: 'This is a Boss Strats test thread',
                author: 'Mike',
                created: Date.now(),
                category: 1,
                lastCommentAuthor: 'Mike',
                lastCommentDate: Date.now(),
                replies: 5,
                views: 5
            },
            {
                title: 'This is another Boss Strats test thread',
                author: 'Mike',
                created: Date.now(),
                category: 1,
                lastCommentAuthor: 'Mike',
                lastCommentDate: Date.now(),
                replies: 5,
                views: 5
            },
            {
                title: 'This is an Officers test thread',
                author: 'Mike',
                created: Date.now(),
                category: 2,
                lastCommentAuthor: 'Mike',
                lastCommentDate: Date.now(),
                replies: 5,
                views: 5
            },
            {
                title: 'This is another Officers test thread',
                author: 'Mike',
                created: Date.now(),
                category: 2,
                lastCommentAuthor: 'Mike',
                lastCommentDate: Date.now(),
                replies: 5,
                views: 5
            }
        ],

        getThreadsByCategory: function (_id) {

            obj.threads = [];
            
            for(var i = 0; i < obj.testThreads.length; i++) {
                if(obj.testThreads[i].category == _id) {
                    obj.threads.push(obj.testThreads[i]);
                }
            }

            return obj.threads;

        },
        addThread: function(thread) {
            obj.testThreads.push(thread);
        }


    };

    return obj;
}])