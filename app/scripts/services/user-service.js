/**
 * 
 * @module user-service
 * @author Greg Babula [gbabula@gmail.com]
 * @description
 * 
 */


'use strict';


var services = angular.module('cloudsqApp-user.services', []);

services.factory('User', function() {

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

            success();
             
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

            success();
        
        }
    };

});
