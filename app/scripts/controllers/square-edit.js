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

        // $scope.destroy = function() {

            // User.destroy();

            // if ($window.confirm('Are you sure you want to delete\nthis account and all data?')) {
                // _this.original.destroy(function() {
                    // $location.path('/logout');
                // });
            // }

        // };

        $scope.save = function() {

            User.update({}, function() {
                console.log('test');
            });

            // $scope.cloudSquareUser.update(function() {
                // $location.path('/user/' + $scope.user.username + '');
            // });

        };

    });
