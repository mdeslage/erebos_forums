// /public/app.js
(function() {
    'use strict';
    angular.module('forumApp', ['ngMaterial', 'ui.router', 'ngMessages', 'ngMdIcons'])

        .config(function($mdThemingProvider) {
            $mdThemingProvider.theme('default')
                .primaryPalette('blue-grey', {
                    'default': '700',
                    'hue-1': '800'
                })
                .accentPalette('teal')
                
        });
})();

