// services/category.js
var app = angular.module('forumApp');

app.factory('category', ['$http', function($http) {
    var obj = {
        categories: [],
        getAll: function() {
            return $http.get('/categories').success(function(data) {
                angular.copy(data, obj.categories);
            });
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
            return $http.post('/categories', category).success(function(data) {
                obj.categories.push(data);
            });
        },
        editCategory: function(category) {
            
        },
        deleteCategory: function(category) {

        }
    };

    return obj;
}])