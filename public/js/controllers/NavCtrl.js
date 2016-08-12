//controllers/NavCtrl.js
var app = angular.module('forumApp');

app.controller('NavCtrl', NavCtrl);

NavCtrl.$inject = ['auth', '$window'];

function NavCtrl(auth, $window) {
    var self = this;

    self.isLoggedIn = auth.isLoggedIn();
    self.currentUser = auth.currentUser();
    self.logout = function() {
        auth.logout();
    }
}