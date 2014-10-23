/**
 * 
 * @module user-settings
 * @author Greg Babula [gbabula@gmail.com]
 * @description
 * 
 * @todo add functionality 
 * 
 */

'use strict';


angular.module('cloudsqApp')
    .controller('UserSettingsCtrl', function($rootScope, $scope, $location) {

        $rootScope.searchStatus = 'inactive';
        $rootScope.footerStatus = 'active';

        $scope.save = function() {
            console.log('user settings save', $scope.user);
        };

    });
