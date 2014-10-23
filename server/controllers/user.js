/**
 *
 * @module user
 * @author Greg Babula [gbabula@gmail.com]
 * @description user controller
 * 
 */

'use strict';


var _         = require('underscore');
var User      = require('../models/User.js');
var userRoles = require('../../app/scripts/routingConfig').userRoles;


module.exports = {

    /**
     * 
     * @function index
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     * @description sends clean Users Array to client
     * 
     */
    index: function(req, res, next) {

        var users = User.indexAll();

        res.json(users);

    }

};
