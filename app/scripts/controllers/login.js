/**
 * 
 * @module login
 * @author Greg Babula [gbabula@gmail.com]
 * @description
 * 
 */


'use strict';


angular.module('cloudsqApp')
    .controller('LoginCtrl', function($rootScope, $scope, $location, Auth) {

        $rootScope.searchStatus = 'inactive';
        $rootScope.footerStatus = 'inactive';

        $scope.rememberme = true;

        $scope.login = function() {

            Auth.login({
                username: $scope.username,
                password: $scope.password,
                rememberme: $scope.rememberme
            },
            function(res) {

                $location.path('/profile');

            },
            function(err) {

                $rootScope.error = 'Failed to login: ' + err + '';

            });

        };

    });
