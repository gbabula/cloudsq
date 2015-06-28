/**
 * 
 * @module square-edit
 * @author Greg Babula [gbabula@gmail.com]
 * @description
 * 
 */

'use strict';


angular.module('cloudsqApp')
    .controller('EditSqCtrl', function($scope, $rootScope, $location, Auth, User) {

        $rootScope.searchStatus = 'inactive';
        $rootScope.footerStatus = 'active';

        $scope.userSquareControl = false;
        $scope.userSquareRegister = false;

        $scope.user = $rootScope.user;
        $scope.isLoggedIn = Auth.isLoggedIn($scope.user);

        // TODO compare against cached object
        $scope.isClean = function() {

            // return angular.equals(_original, $scope.user);

        };

        /**
         *
         * @function save
         *
         */
        $scope.save = function() {

            User.update($scope.user, function(res) {

                $location.path('/user/' + $scope.user.username + '/');

            }, function(err) {

                $rootScope.error = 'Failed to update: ' + err;

            });

        };

    });
