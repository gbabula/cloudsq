/*

    Cloudsq

    routingConfig.js

        Both the user roles and access levels are defined as numbers 
        so that it is possible to calculate permissions using binary operations. 
        User roles are defined by which bit is set to 1, while access levels indicate 
        whether that user role has access by setting the corresponding bit to either 1 or 0.

*/

'use strict';

(function(exports){

    exports.userRoles = {
        public: 1, // 001
        user:   2, // 010
        admin:  4  // 100
    };

    exports.accessLevels = {
        public: 7, // 111
        anon:   1, // 001
        user:   6, // 110
        admin:  4  // 100
    };

})(typeof exports === 'undefined'? this['routingConfig']={}: exports);