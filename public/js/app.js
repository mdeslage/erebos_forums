// /public/app.js
(function () {
    'use strict';
    angular.module('forumApp', ['ngMaterial', 'ui.router', 'ngMessages', 'ngMdIcons'])

        .run(
        ['$rootScope', '$state', '$stateParams',
            function ($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
        )

        .config(function ($mdThemingProvider) {
            $mdThemingProvider.theme('default')
                .primaryPalette('blue-grey', {
                    'default': '700',
                    'hue-1': '800'
                })
                .accentPalette('teal')

        });
})();

