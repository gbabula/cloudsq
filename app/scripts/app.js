/*

    Cloudsq

    app.js

*/


'use strict';


var app = angular.module('cloudsqApp', [
    'ngRoute',
    'ngResource',
    'ngAnimate',
    'ngCookies',
    'emguo.poller',
    'md5',
    'ui-gravatar',
    'cloudsqApp-auth.services',
    'cloudsqApp.directives',
    'cloudsqApp.filters'
]);

app.config(['$routeProvider', '$locationProvider', '$httpProvider',
    function($routeProvider, $locationProvider, $httpProvider) {

        var access = routingConfig.accessLevels;

        $routeProvider.when('/', {
            templateUrl:    '/views/partials/main.html',
            controller:     'SqListCtrl',
            access:         access.public
        });

        $routeProvider.when('/about', {
            templateUrl:    '/views/partials/about.html',
            controller:     'StandardPageCtrl',
            access:         access.public
        });

        $routeProvider.when('/login', {
            templateUrl:    '/views/partials/login.html',
            controller:     'LoginCtrl',
            access:         access.anon
        });

        $routeProvider.when('/register', {
            templateUrl:    '/views/partials/square-detail.html',
            controller:     'RegisterSqCtrl',
            access:         access.anon
        });

        $routeProvider.when('/edit/:cloudSquareUserId', {
            templateUrl:    '/views/partials/square-detail.html',
            controller:     'EditSqCtrl',
            access:         access.user
        });

        $routeProvider.when('/profile', {
            templateUrl:    '/views/partials/profile.html',
            controller:     'UserPrivateProfileCtrl',
            access:         access.user
        });

        $routeProvider.when('/profile/settings', {
            templateUrl:    '/views/partials/settings.html',
            controller:     'UserSettingsCtrl',
            access:         access.user
        });

        $routeProvider.when('/user/:cloudSquareUserName', {
            templateUrl:    '/views/partials/user.html',
            controller:     'UserProfileCtrl',
            access:         access.public
        });

        $routeProvider.when('/admin', {
            templateUrl:    '/views/partials/admin.html',
            controller:     'AdminCtrl',
            access:         access.admin
        });

        $routeProvider.when('/404', {
            templateUrl:    '/views/partials/404.html',
            controller:     'StandardPageCtrl',
            access:         access.public
        });

        $routeProvider.otherwise({
            redirectTo:     '/'
        });

        $locationProvider.html5Mode(true);

        var interceptor = ['$location', '$q', function($location, $q) {

            function success(response) {

                return response;

            }

            function error(response) {

                if(response.status === 401) {
                    $location.path('/login');
                    return $q.reject(response);
                } else {
                    return $q.reject(response);
                }

            }

            return function(promise) {
                return promise.then(success, error);
            };

        }];

        $httpProvider.responseInterceptors.push(interceptor);

    }])

    .run(['$rootScope', '$location', 'Auth', '$window', '$anchorScroll', '$routeParams',
        function($rootScope, $location, Auth, $window, $anchorScroll, $routeParams) {

            $rootScope.$on('$routeChangeStart', function(event, next, current) {

                $rootScope.error = null;

                if (!Auth.authorize(next.access, $rootScope.user.role)) {

                    if (Auth.isLoggedIn($rootScope.user)) {
                        $location.path('/');
                    } else {
                        $location.path('/login');
                    }

                }

            });

            $rootScope.appInitialized = true;

            $rootScope.$on('$routeChangeSuccess', function() {

                var scrollToTop = 'top',
                    scrollToLoc = $routeParams.scrollTo;

                if (scrollToLoc) {

                    $location.hash(scrollToLoc);

                    setTimeout(function() {
                        $anchorScroll(scrollToLoc);
                    }, 100);

                } else {

                    setTimeout(function() {
                        $anchorScroll(scrollToTop);
                    }, 100);

                }

            });

        }

    ]);
