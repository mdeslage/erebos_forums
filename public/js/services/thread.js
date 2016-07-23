//services/thread.js
var app = angular.module('forumApp');

app.factory('thread', ['$http', function($http) {
    var obj = {
        threads: [],
        testThreads: [
            {
                _id: 0,
                title: 'This is a General test thread',
                author: 'Mike',
                body: 'This is the body of the test thread',
                created: Date.now(),
                category: 0,
                lastCommentAuthor: 'Mike',
                lastCommentDate: Date.now(),
                replies: 5,
                views: 5,
                comments: [
                    {
                        body: 'This is the text of a general test comment',
                        author: 'Mike'
                    },
                    {
                        body: 'This is a second general test comment',
                        author: 'Anthony'
                    }
                ]
            },
            {
                _id: 1,
                title: 'This is another General test thread',
                author: 'Mike',
                body: 'This is the body of the test thread',
                created: Date.now(),
                category: 0,
                lastCommentAuthor: 'Mike',
                lastCommentDate: Date.now(),
                replies: 5,
                views: 5,
                comments: [
                    {
                        body: 'This is the text of a general test comment',
                        author: 'Mike'
                    },
                    {
                        body: 'This is a second general test comment',
                        author: 'Anthony'
                    }
                ]
            },
            {
                _id: 2,
                title: 'This is a Boss Strats test thread',
                author: 'Mike',
                body: 'This is the body of the test thread',
                created: Date.now(),
                category: 1,
                lastCommentAuthor: 'Mike',
                lastCommentDate: Date.now(),
                replies: 5,
                views: 5,
                comments: [
                    {
                        body: 'This is the text of a boss test comment',
                        author: 'Mike'
                    },
                    {
                        body: 'This is a second boss test comment',
                        author: 'Anthony'
                    }
                ]
            },
            {
                _id: 3,
                title: 'This is another Boss Strats test thread',
                author: 'Mike',
                body: 'This is the body of the test thread',
                created: Date.now(),
                category: 1,
                lastCommentAuthor: 'Mike',
                lastCommentDate: Date.now(),
                replies: 5,
                views: 5,
                comments: [
                    {
                        body: 'This is the text of a boss test comment',
                        author: 'Mike'
                    },
                    {
                        body: 'This is a second boss test comment',
                        author: 'Anthony'
                    }
                ]
            },
            {
                _id: 4,
                title: 'This is an Officers test thread',
                author: 'Mike',
                body: 'This is the body of the test thread',
                created: Date.now(),
                category: 2,
                lastCommentAuthor: 'Mike',
                lastCommentDate: Date.now(),
                replies: 5,
                views: 5,
                comments: [
                    {
                        body: 'This is the text of a officer test comment',
                        author: 'Mike'
                    },
                    {
                        body: 'This is a second officer test comment',
                        author: 'Anthony'
                    }
                ]
            },
            {
                _id: 5,
                title: 'This is another Officers test thread',
                author: 'Mike',
                body: 'This is the body of the test thread',
                created: Date.now(),
                category: 2,
                lastCommentAuthor: 'Mike',
                lastCommentDate: Date.now(),
                replies: 5,
                views: 5,
                comments: [
                    {
                        body: 'This is the text of a officer test comment',
                        author: 'Mike'
                    },
                    {
                        body: 'This is a second officer test comment',
                        author: 'Anthony'
                    }
                ]
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
            console.log('got in here');
            obj.threads.push(thread);
            obj.testThreads.push(thread);
        },

        getThread: function(_id) {
            // Just get it based on the id in the array for now
            return obj.testThreads[_id];
        }


    };

    return obj;
}])