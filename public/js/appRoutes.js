// public/appRoutes.js
var app = angular.module('forumApp');

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {
        
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
                controller: 'ForumCtrl as forum',
                onEnter: ['$location', 'auth', function($location, auth) {
                    if(!auth.isLoggedIn()) {
                        $location.path('/login');
                    }
                }],
                resolve: {
                    categories: ['category', function(category) {
                        return category.getAll();
                    }]
                }
            })
            // State for the threads in a category
            .state('category', {
                url: '/forum/category/{id}',
                templateUrl: '../views/category.html',
                controller: 'CategoryCtrl as cat',
                onEnter: ['$location', 'auth', function($location, auth) {
                    if(!auth.isLoggedIn()) {
                        $location.path('/login');
                    }
                }],
                resolve: {
                    currentCategory: ['category', '$stateParams', function(category, $stateParams) {
                        return category.getCategory($stateParams.id);
                    }],
                    threads: ['thread', '$stateParams', function(thread, $stateParams) {
                        return thread.getThreadsByCategory($stateParams.id);
                    }]
                    
                }
            })

            // State for a thread and it's comments
            .state('thread', {
                url: '/forum/category/{id}/thread/{thread_id}',
                templateUrl: '../views/thread.html',
                controller: 'ThreadCtrl as thread',
                onEnter: ['$location', 'auth', function($location, auth) {
                    if(!auth.isLoggedIn()) {
                        $location.path('/login');
                    }
                }],
                resolve: {
                    currThread: ['thread', '$stateParams', function(thread, $stateParams) {
                        return thread.getThread($stateParams.thread_id);
                    }]
                }
            })

            // Login page for the application
            .state('login', {
                url: '/login',
                templateUrl: '../views/login.html',
                controller: 'AuthenticationCtrl as auth',
                onEnter: ['$location', 'auth', function($location, auth) {
                    if(auth.isLoggedIn()) {
                        $location.path('/forum');
                    }
                }]
            })

            // Register page for the application
            .state('register', {
                url: '/register',
                templateUrl: '../views/register.html',
                controller: 'AuthenticationCtrl as auth',
                onEnter: ['$location', 'auth', function($location, auth) {
                    if(auth.isLoggedIn()) {
                        $location.path('/forum');
                    }
                }]
            });

        $urlRouterProvider.otherwise('home');

        // HTML5 History API to remove hashbang
        $locationProvider.html5Mode(true);
    }
])