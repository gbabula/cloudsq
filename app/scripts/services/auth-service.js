/*

    Cloudsq

    services/auth-service.js

*/


'use strict';


var services = angular.module('cloudsqApp-auth.services', []);

services.factory('Auth', function($http, $rootScope, $cookieStore) {

    var baseUser = userConfig.base,
        accessLevels = routingConfig.accessLevels,
        userRoles = routingConfig.userRoles;

    $rootScope.user = $cookieStore.get('user') || baseUser;
    $cookieStore.remove('user');

    $rootScope.accessLevels = accessLevels;
    $rootScope.userRoles = userRoles;

    return {
        authorize: function(accessLevel, role) {

            return accessLevel & role;

        },
        isLoggedIn: function(user) {

            return user.role === userRoles.user || user.role === userRoles.admin;

        },
        register: function(user, success, error) {

            $http.post('/register', user).success(success).error(error);

        },
        login: function(user, success, error) {

            $http.post('/login', user).success(function(user){

                $rootScope.user = user;
                success(user);

            }).error(error);

        },
        logout: function(success, error) {

            $http.post('/logout').success(function(){

                $rootScope.user = anonUser;
                success();

            }).error(error);

        },
        accessLevels: accessLevels,
        userRoles: userRoles
    };
});

services.factory('Users', function($timeout, $resource, poller) {

    return {
        count: 0,
        delay: 60000,
        list: [],
        resource: $resource('/users'),
        poll: function(success) {

            var requestPoller = poller.get(this.resource, { delay: this.delay });

            requestPoller.promise.then(null, null, function(data) {
                success(data);
            });

        },
        stop: function() {

            // this.pollerService.stopAll();

        },
        restart: function() {

            // this.pollerService.restartAll();

        },
        findByUsername: function(username) {

            return _.find(this.list, function(user) { return user.username === username; });

        }
    };

});
