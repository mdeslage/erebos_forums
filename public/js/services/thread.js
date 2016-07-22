//services/thread.js
var app = angular.module('forumApp');

app.factory('thread', ['$http', function($http) {
    var obj = {

        threads: [
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
            var valid = [];

            for(var i = 0; i < obj.threads.length; i++) {
                if(obj.threads[i].category == _id) {
                    valid.push(obj.threads[i]);
                }
            }

            return valid;
        }
    };

    return obj;
}])