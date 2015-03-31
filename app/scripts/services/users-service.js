/**
 * 
 * @module users-service
 * @author Greg Babula [gbabula@gmail.com]
 * @description
 * 
 */

'use strict';

var services = angular.module('cloudsqApp-users.services', []);

services.factory('Users', function($timeout, $resource, poller) {

    return {
        count: 0,
        list: [],
        /**
         *
         * @method poll
         * @param {Function} success
         *
         */
        poll: function(success) {

            var requestPoller = poller.get($resource('/users'), { delay: 30000 });

            requestPoller.promise.then(null, null, function(data) {
                success(data);
            });

        },
        /**
         *
         * @method findByUsername
         * @param {String} username
         *
         */
        findByUsername: function(username) {

            return _.find(this.list, function(user) { return user.username === username; });

        }
    };

});
