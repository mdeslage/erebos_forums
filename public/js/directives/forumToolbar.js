//directives/forumToolbar.js
var app = angular.module('forumApp');

app.directive('forumToolbar', function() {
    return {
        restrict: 'A',
        templateUrl: '../../views/forumToolbar.html',
        replace: true,
        controller: 'NavCtrl',
        controllerAs: 'nav'
    };
});