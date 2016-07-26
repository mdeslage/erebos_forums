// controllers/AuthenticationCtrl.js
var app = angular.module('forumApp');

app.controller('AuthenticationCtrl', AuthenticationCtrl);

AuthenticationCtrl.$inject = ['$state', 'auth'];

function AuthenticationCtrl($state, auth) {
    var self = this;
    self.user = {};

    self.register = function() {
        auth.register(self.user).error(function(error) {
            self.error = error;
        }).then(function() {
            // Might want to not redirect them to the forum only
            $state.go('forum');
        });
    };

    self.login = function() {
        auth.login(user).error(function(error) {
            self.error = error;
        }).then(function() {
            $state.go('forum');
        });
    };
}