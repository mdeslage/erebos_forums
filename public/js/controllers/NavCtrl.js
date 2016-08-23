//controllers/NavCtrl.js
var app = angular.module('forumApp');

app.controller('NavCtrl', NavCtrl);

NavCtrl.$inject = ['auth', '$state'];

function NavCtrl(auth, $state) {
    var self = this;

    self.isLoggedIn = auth.isLoggedIn();
    self.currentUser = auth.currentUser();
    self.logout = function() {
        auth.logout();
    }
}