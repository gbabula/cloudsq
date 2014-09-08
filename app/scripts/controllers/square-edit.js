/**
 * 
 * @module square-edit
 * @author Greg Babula [gbabula@gmail.com]
 * @description
 * 
 */


'use strict';


angular.module('cloudsqApp')
    .controller('EditSqCtrl', function($scope, $rootScope, $location, $routeParams, $window) {

        $rootScope.searchStatus = 'inactive';
        $rootScope.footerStatus = 'active';

        $scope.userSquareControl = false;
        $scope.userSquareRegister = false;

        $scope.cloudSquareUser = $rootScope.user;

        // $scope.cloudSquareUser = Users.findByUsername($routeParams.cloudSquareUser);
        // Project.get({id: $routeParams.cloudSquareUserId}, function(cloudSquareUser) {

            // _this.original = cloudSquareUser;
            // $scope.cloudSquareUser = new Project(_this.original);

        // });

        // $scope.isClean = function() {

            // return angular.equals(_this.original, $scope.cloudSquareUser);

        // };

        // $scope.destroy = function() {

            // if ($window.confirm('Are you sure you want to delete\nthis account and all data?')) {
                // _this.original.destroy(function() {
                    // $location.path('/logout');
                // });
            // }

        // };

        // $scope.save = function() {

            // $scope.user = $scope.cloudSquareUser;

            // $scope.cloudSquareUser.update(function() {
                // $location.path('/user/' + $scope.user.username + '');
            // });

        // };

    });
