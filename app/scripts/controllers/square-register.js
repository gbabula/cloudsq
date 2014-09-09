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
        // $scope.user = angular.extend(userConfig.base, {
            // role: routingConfig.userRoles.user
        // });

        $rootScope.loading = false;
        $scope.userSquareRegister = true;

        $scope.$watch('user.email', function() {

            $scope.user.email = angular.lowercase($scope.user.email);

        });

        $scope.$watch('user.username', function() {

            var username = angular.lowercase($scope.user.username || ' ').replace(/\s+/g, '');

            $scope.user.username = username;
            $scope.user.site = 'http://cloudsq.com/user/' + username + '';

        });

        // pass on the user object to the
        // auth service 
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
