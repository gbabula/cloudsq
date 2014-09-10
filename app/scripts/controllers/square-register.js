/**
 * 
 * @module square-register
 * @author Greg Babula [gbabula@gmail.com]
 * @description
 * 
 */


'use strict';


angular.module('cloudsqApp')
    .controller('RegisterSqCtrl', function($rootScope, $scope, $location, Auth, Users) {

        $rootScope.searchStatus = 'inactive';
        $rootScope.footerStatus = 'inactive';

        $scope.user = $rootScope.user;

        $rootScope.loading = false;
        $scope.userSquareRegister = true;

        /**
         *
         * @function
         * @description makes sure email is lowercase so that 
         * it can be correctly picked up by the gravatar directive
         *
         */
        $scope.$watch('user.email', function() {

            $scope.user.email = angular.lowercase($scope.user.email);

        });

        /**
         *
         * @function
         * @description makes sure username is lowercase and removes
         * special characters
         *
         */
        $scope.$watch('user.username', function() {

            var username = angular.lowercase($scope.user.username || ' ').replace(/\s+/g, '');

            $scope.user.username = username;
            $scope.user.site = 'http://cloudsq.com/user/' + username + '';

        });

        /**
         *
         * @function save
         * @description adds user to database
         *
         */
        $scope.save = function() {

            Auth.register($scope.user, function(res) {

                $rootScope.user = res;

                $location.path('/profile/');

            },
            function(err) {

                $rootScope.error = err;

            });

        };

    });
