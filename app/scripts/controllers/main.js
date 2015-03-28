/**
 * 
 * @module main
 * @author Greg Babula [gbabula@gmail.com]
 * @description main app controller
 * 
 * @todo documentation & cleanup
 * 
 */

'use strict';


angular.module('cloudsqApp')
    .controller('AppCtrl', function($rootScope, $scope, $location, $window, Auth) {

        $rootScope.footerStatus = 'active';
        $rootScope.searchStatus = 'active';

        var currentRoute = function(loc) {
            return loc.path().substring(1) || 'home';
        };

        var safeApply = function(scope, fn) {
            (scope.$$phase || scope.$root.$$phase) ? fn() : scope.$apply(fn);
        };

        $scope.currentPage = function() {

            var base = ' - Cloudsq.com',
                current = currentRoute($location),
                currentClass = current.replace('/', ' '),
                title = (current.charAt(0).toUpperCase() + current.slice(1)) + base;

            return {
                title: title,
                page: current,
                pageClass: currentClass
            };

        };

        $scope.back = function() {
            $window.history.go(-1);
        };

        $scope.navClass = function(page) {
            return page === currentRoute($location) ? 'active' : 'inactive';
        };

        $scope.toggleClass = function(page) {
            return currentRoute($location) === page ? 'active' : 'inactive';
        };

        $scope.toggleCustomClass = function(page, ifTrue, ifFalse) {
            return currentRoute($location) === page ? ifTrue : ifFalse;
        };

        $scope.getUserRoleText = function(role) {
            return _.invert(Auth.userRoles)[role];
        };

        $scope.toggleNav = function() {

            if ($scope.navStatus === 'active') {
                $scope.navStatus = 'inactive';
            } else {
                $scope.navStatus = 'active';
            }

        };

        $scope.reverse = function(array) {

            return [].concat(array).reverse();

        };

        $scope.logout = function() {

            Auth.logout(function() {
                $location.path('/');
            }, function() {
                $rootScope.error = 'Failed to logout';
            });

        };

    })
    .controller('StandardPageCtrl', function($rootScope, $scope) {

        $rootScope.searchStatus = 'inactive';
        $rootScope.footerStatus = 'inactive';

    });
