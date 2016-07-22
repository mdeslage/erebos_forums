// controllers/ForumCtrl.js
var app = angular.module('forumApp');

app.controller('ForumCtrl', ForumCtrl);

ForumCtrl.$inject = ['category'];

function ForumCtrl(category) {
    var self = this;

    self.categories = category.categories;
}