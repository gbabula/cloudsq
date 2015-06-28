/**
 * 
 * @module user-settings
 * @author Greg Babula [gbabula@gmail.com]
 * @description
 * 
 */

'use strict';


angular.module('cloudsqApp')
    .controller('UserSettingsCtrl', function($rootScope, $scope, $location, $window, User) {

        $rootScope.searchStatus = 'inactive';
        $rootScope.footerStatus = 'active';

        /**
         *
         * @function destroy
         *
         */
        $scope.destroy = function() {

            if ($window.confirm('Are you sure you want to delete\nthis account and all data?')) {

                User.destroy($scope.user, function(res) {

                    $location.path('/');

                }, function(err) {

                    $rootScope.error = 'Failed to delete user: ' + err;

                });

            }

        };

        /**
         *
         * @function save
         * @todo
         *
         */
        $scope.save = function() {

            console.log('user settings save', $scope.user);

        };

    });
