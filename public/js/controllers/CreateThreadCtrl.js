// controllers/CreateThreadCtrl.js
var app = angular.module('forumApp');

app.controller('CreateThreadCtrl', CreateThreadCtrl);

CreateThreadCtrl.$inject = ['category', 'thread', '$stateParams', '$location'];

function CreateThreadCtrl(category, thread, $stateParams, $location) {
    var self = this;

    var id = $stateParams.id;
    self.category = category.getCategory(id);

    self.catName = self.category.name;
    self.title = '';
    self.body = '';

    self.addThread = function() {
        if(self.body === '') { return; }

        thread.addThread({
            title: self.title,
            author: 'Mike',
            created: Date.now(),
            category: id,
            lastCommentAuthor: 'Mike',
            lastCommentDate: Date.now(),
            replies: 5,
            views: 5
        });

        self.title = '';
        self.body = '';

        $location.path('/forum/category/' + id);
    }
}

