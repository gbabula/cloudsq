/**
 * 
 * @module admin
 * @author Greg Babula [gbabula@gmail.com]
 * @description
 * 
 */


'use strict';


angular.module('cloudsqApp')
    .controller('AdminCtrl', function($rootScope, $scope, Users) {

        $rootScope.searchStatus = 'active';
        $rootScope.footerStatus = 'active';

        $scope.users = Users.list;
        $scope.usersInitialized = true;

        $rootScope.loading = false;

    });
