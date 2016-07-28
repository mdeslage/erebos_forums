// controllers/AuthenticationCtrl.js
var app = angular.module('forumApp');

app.controller('AuthenticationCtrl', AuthenticationCtrl);

AuthenticationCtrl.$inject = ['$state', 'auth'];

function AuthenticationCtrl($state, auth) {
    var self = this;
    self.user = {};
    self.error = {};

    self.register = function() {
        if(self.user.password !== self.user.passwordConfirm) {
            self.error.message = "Passwords do not match";
            return;
        }
        auth.register(self.user).error(function(error) {
            self.error = error;
        }).then(function() {
            // Might want to not redirect them to the forum only
            $state.go('forum');
        });
    };

    self.login = function() {
        auth.login(self.user).error(function(error) {
            self.error = error;
        }).then(function() {
            $state.go('forum');
        });
    };
}