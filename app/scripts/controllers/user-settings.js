/**
 * 
 * @module user-settings
 * @author Greg Babula [gbabula@gmail.com]
 * @description
 * 
 */

'use strict';


angular.module('cloudsqApp')
    .controller('UserSettingsCtrl', function($rootScope, $scope, $location, Project) {

        $rootScope.searchStatus = 'inactive';
        $rootScope.footerStatus = 'active';

        $scope.save = function() {
            console.log('user settings save', $scope.user);

            // $scope.cloudSquareUser = new Project($scope.user);
            // $scope.cloudSquareUser.update(function() {
            //     $location.path('/profile/');
            // });
        };

    });
