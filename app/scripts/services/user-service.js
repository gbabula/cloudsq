/**
 * 
 * @module user-service
 * @author Greg Babula [gbabula@gmail.com]
 * @description
 * 
 * @todo set up user methods
 * 
 */

'use strict';


var services = angular.module('cloudsqApp-user.services', []);

services.factory('User', function($http) {

    return {
        /**
         *
         * @method destory
         * @param {Object} user
         * @param {Function} success
         * @param {Function} error
         *
         */
        destroy: function(user, success, error) {

            $http.post('/destroy', user).success(success).error(error);

        },
        /**
         *
         * @method update
         * @param {Object} user
         * @param {Function} success
         * @param {Function} error
         *
         */
        update: function(user, success, error) {

            $http.post('/update', user).success(success).error(error);

        }
    };

});
