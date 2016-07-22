var app = angular.module('forumApp');

app.controller('MainCtrl', MainCtrl);

function MainCtrl() {
    var self = this;

    self.text = "Hello, world!";
}