// services/category.js
var app = angular.module('forumApp');

app.factory('category', ['$http', 'auth', function($http, auth) {
    var obj = {
        categories: [],
        currentCategory: {},
        getAll: function() {
            return $http.get('/categories').success(function(data) {
                angular.copy(data, obj.categories);
            });
        },
        getCategory: function(_id) {
           return $http.get('/categories/' + _id).success(function(data) {
               angular.copy(data, obj.currentCategory);
           });
        },
        addCategory: function(category) {
            return $http.post('/categories', category, {
                headers: { Authorization: 'Bearer ' + auth.getToken() }
            }).success(function(data) {
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