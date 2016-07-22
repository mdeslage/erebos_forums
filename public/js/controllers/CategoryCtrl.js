//controller/CategoryCtrl.js
var app = angular.module('forumApp');

app.controller('CategoryCtrl', CategoryCtrl);

CategoryCtrl.$inject = ['thread', 'category', '$stateParams'];

function CategoryCtrl(thread, category, $stateParams) {
    var self = this;

    var id = $stateParams.id;

    self.threads = thread.getThreadsByCategory(id);
    self.category = category.getCategory(id);
}