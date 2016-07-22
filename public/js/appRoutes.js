// public/appRoutes.js
var app = angular.module('forumApp');

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        
        $stateProvider
            // Default home state for the site
            .state('home', {
                url: '/home',
                templateUrl:'../views/home.html',
                controller: 'MainCtrl as main'
            })
            // Home state for the forums w/ categories
            .state('forum', {
                url: '/forum',
                templateUrl: '../views/forum.html',
                controller: 'ForumCtrl as forum'
            })
            // State for the threads in a category
            .state('category', {
                url: '/forum/category/{id}',
                templateUrl: '../views/threads.html',
                controller: 'CategoryCtrl as category'
            });

        $urlRouterProvider.otherwise('home');
    }
])