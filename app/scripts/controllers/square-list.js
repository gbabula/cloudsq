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

        Users.poll(function(data) {

            Users.list = data;
            Users.count = data.length;

            console.log('----------------------');
            console.log('Poll Users');
            console.log(Users.list, Users.count);
            console.log('----------------------');
            console.log('Current User:', $rootScope.user);
            console.log('----------------------');

            if (!Users.count) {

                $rootScope.error = 'Failed to fetch squares :-[';
                $rootScope.loading = false;

            } else {

                $scope.users = _.shuffle(Users.list);
                $scope.usersInitialized = true;
                $rootScope.userCount = Users.count;

            }

        });

    });
