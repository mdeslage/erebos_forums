//controller/CategoryCtrl.js
var app = angular.module('forumApp');

app.controller('CategoryCtrl', CategoryCtrl);

CategoryCtrl.$inject = ['thread', 'category', '$stateParams', '$mdDialog'];

function CategoryCtrl(thread, category, $stateParams, $mdDialog) {
    var self = this;

    var id = $stateParams.id;

    self.threads = thread.getThreadsByCategory(id);
    self.category = category.getCategory(id);

}