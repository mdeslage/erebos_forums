//controllers/NavCtrl.js
var app = angular.module('forumApp');

app.controller('NavCtrl', NavCtrl);

NavCtrl.$inject = ['auth'];

function NavCtrl(auth) {
    var self = this;

    self.isLoggedIn = auth.isLoggedIn;
    self.currentUser = auth.currentUser;
    self.logout = auth.logout;
}