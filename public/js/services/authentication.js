// services/authentication.js
var app = angular.module('forumApp');

app.factory('auth', ['$http', '$window', function($http, $window) {
    var auth = {};

    auth.saveToken = function(token) {
        $window.localStorage['erebos-token'] = token;
    };

    auth.getToken = function() {
        return $window.localStorage['erebos-token'];
    };

    auth.isLoggedIn = function() {
        var token = auth.getToken();

        if(token) {
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            // If token isn't expired user is logged in
            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    };

    // Returns and object with information pertaining to the current user
    auth.currentUser = function() {
        console.log('In function');
        if(auth.isLoggedIn()) {
            var token = auth.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return {
                username: payload.username,
                permission_level: payload.permission_level,
                _id: payload._id
            };
        }
    };

    auth.register = function(user) {
        return $http.post('/register', user).success(function(data) {
            auth.saveToken(data.token);
        })
    };

    auth.login = function(user) {
        return $http.post('/login', user).success(function(data) {
            auth.saveToken(data.token);
        });
    };

    auth.logout = function() {
        $window.localStorage.removeItem('erebos-token');
    };

    return auth;
}])