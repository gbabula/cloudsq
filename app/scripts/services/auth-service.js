/**
 * 
 * @module auth-service
 * @author Greg Babula [gbabula@gmail.com]
 * @description
 * 
 */


'use strict';


var services = angular.module('cloudsqApp-auth.services', []);

services.factory('Auth', function($http, $rootScope, $cookieStore) {

    var accessLevels = routingConfig.accessLevels,
        userRoles = routingConfig.userRoles;

    var baseUser = angular.extend(userConfig.base, {
        role: userRoles.public
    });

    $rootScope.user = $cookieStore.get('user') || baseUser;
    $rootScope.accessLevels = accessLevels;
    $rootScope.userRoles = userRoles;

    return {
        /**
         *
         * @method authorize
         * @param {} accessLevel
         * @param {} role
         * @description
         *
         */
        authorize: function(accessLevel, role) {

            return accessLevel & role;

        },
        /**
         *
         * @method isLoggedIn
         * @param {Object} user
         * @description
         *
         */
        isLoggedIn: function(user) {

            return user.role === userRoles.user || user.role === userRoles.admin;

        },
        /**
         *
         * @method register
         * @param {Object} user
         * @param {Function} success
         * @param {Function} error
         * @description
         *
         */
        register: function(user, success, error) {

            $http.post('/register', user).success(success).error(error);

        },
        /**
         *
         * @method login
         * @param {Object} user
         * @param {Function} success
         * @param {Function} error
         * @description
         *
         */
        login: function(user, success, error) {

            $http.post('/login', user).success(function(user){

                $rootScope.user = user;
                $cookieStore.put('user', user);

                success(user);

            }).error(error);

        },
        /**
         *
         * @method logout
         * @param {Function} success
         * @param {Function} error
         * @description
         *
         */
        logout: function(success, error) {

            $http.post('/logout').success(function(){

                $rootScope.user = baseUser;
                $cookieStore.remove('user');

                success();

            }).error(error);

        },
        accessLevels: accessLevels,
        userRoles: userRoles
    };
});
