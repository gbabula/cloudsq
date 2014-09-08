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

        $scope.cloudSquareUser = angular.extend(userConfig.base, {
            role: routingConfig.userRoles.user
        });

        $rootScope.loading = false;
        $scope.userSquareRegister = true;

        $scope.$watch('cloudSquareUser.email', function() {

            $scope.cloudSquareUser.email = angular.lowercase($scope.cloudSquareUser.email);

        });

        $scope.$watch('cloudSquareUser.username', function() {

            var username = angular.lowercase($scope.cloudSquareUser.username || ' ').replace(/\s+/g, '');

            $scope.cloudSquareUser.username = username;
            $scope.cloudSquareUser.site = 'http://cloudsq.com/user/' + username + '';

        });

        // pass on the user object to the
        // auth service 
        $scope.save = function() {

            console.log($scope.cloudSquareUser);

            Auth.register($scope.cloudSquareUser,
            // Auth.register({
                // username: $scope.cloudSquareUser.username,
                // password: $scope.cloudSquareUser.password,
                // email: $scope.cloudSquareUser.email,
                // site: $scope.cloudSquareUser.site,
                // role: $scope.cloudSquareUser.role
            // },
            function(res) {

                $rootScope.user = res;

                $location.path('/profile/');

            },
            function(err) {

                $rootScope.error = err;

            });

        };

    });
