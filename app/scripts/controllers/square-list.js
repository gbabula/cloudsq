/**
 * 
 * @module square-list
 * @author Greg Babula [gbabula@gmail.com]
 * @description main squre list controller
 * 
 */


'use strict';


angular.module('cloudsqApp')
    .controller('SqListCtrl', function($rootScope, $scope, Users) {

        $rootScope.searchStatus = 'active';
        $rootScope.footerStatus = 'active';

        $scope.csUserLimit = 25;

        if (!Users.count) {

            $rootScope.error = 'Failed to fetch squares :-(';
            $rootScope.loading = false;

        } else {

            $scope.users = _.shuffle(Users.list);

            // TODO sort users by points
            // $scope.users = _.sortBy();

            $scope.usersInitialized = true;

        }

    });
