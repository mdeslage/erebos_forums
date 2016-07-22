// services/category.js
var app = angular.module('forumApp');

app.factory('category', ['$http', function($http) {
    var obj = {
        categories: [
            {
                _id: 0,
                name: 'General',
                rank: 1,
                recentThreads: [
                    {
                        title: 'This is a general test thread',
                        author: 'Mike',
                        created: Date.now(),
                        category: 0,
                        lastCommentAuthor: 'Mike',
                        lastCommentDate: Date.now(),
                        replies: 5,
                        views: 5
                    },
                    {
                        title: 'This is a another general test thread',
                        author: 'Mike',
                        created: Date.now(),
                        category: 0,
                        lastCommentAuthor: 'Mike',
                        lastCommentDate: Date.now(),
                        replies: 5,
                        views: 5
                    },
                    {
                        title: 'This is a third general test thread',
                        author: 'Mike',
                        created: Date.now(),
                        category: 0,
                        lastCommentAuthor: 'Mike',
                        lastCommentDate: Date.now(),
                        replies: 5,
                        views: 5
                    },
                    {
                        title: 'This is a fourth general test thread',
                        author: 'Mike',
                        created: Date.now(),
                        category: 0,
                        lastCommentAuthor: 'Mike',
                        lastCommentDate: Date.now(),
                        replies: 5,
                        views: 5
                    }
                ]
            },
            {
                _id: 1,
                name: 'Boss Strats',
                rank: 1,
                recentThreads: [
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
                        title: 'This is a another Boss Strats test thread',
                        author: 'Mike',
                        created: Date.now(),
                        category: 1,
                        lastCommentAuthor: 'Mike',
                        lastCommentDate: Date.now(),
                        replies: 5,
                        views: 5
                    },
                    {
                        title: 'This is a third Boss Strats test thread',
                        author: 'Mike',
                        created: Date.now(),
                        category: 1,
                        lastCommentAuthor: 'Mike',
                        lastCommentDate: Date.now(),
                        replies: 5,
                        views: 5
                    },
                    {
                        title: 'This is a fourth Boss Strats test thread',
                        author: 'Mike',
                        created: Date.now(),
                        category: 1,
                        lastCommentAuthor: 'Mike',
                        lastCommentDate: Date.now(),
                        replies: 5,
                        views: 5
                    }
                ]
            },
            {
                _id: 2,
                name: 'Officers',
                rank: 2,
                recentThreads: [
                    {
                        title: 'This is a Officers test thread',
                        author: 'Mike',
                        created: Date.now(),
                        category: 2,
                        lastCommentAuthor: 'Mike',
                        lastCommentDate: Date.now(),
                        replies: 5,
                        views: 5
                    },
                    {
                        title: 'This is a another Officers test thread',
                        author: 'Mike',
                        created: Date.now(),
                        category: 2,
                        lastCommentAuthor: 'Mike',
                        lastCommentDate: Date.now(),
                        replies: 5,
                        views: 5
                    },
                    {
                        title: 'This is a third Officers test thread',
                        author: 'Mike',
                        created: Date.now(),
                        category: 2,
                        lastCommentAuthor: 'Mike',
                        lastCommentDate: Date.now(),
                        replies: 5,
                        views: 5
                    },
                    {
                        title: 'This is a fourth Officers test thread',
                        author: 'Mike',
                        created: Date.now(),
                        category: 2,
                        lastCommentAuthor: 'Mike',
                        lastCommentDate: Date.now(),
                        replies: 5,
                        views: 5
                    }
                ]
            }
        ],
        getAll: function() {

        },
        getCategory: function(_id) {
            var category = {};

            for(var i = 0; i < obj.categories.length; i++) {
                if(obj.categories[i]._id == _id) {
                    category = obj.categories[i];
                }
            }

            return category;
        },
        addCategory: function(category) {

        },
        editCategory: function(category) {
            
        },
        deleteCategory: function(category) {

        }
    };

    return obj;
}])