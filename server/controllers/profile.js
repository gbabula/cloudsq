/**
 *
 * @module profile
 * @author Greg Babula [gbabula@gmail.com]
 * @description
 * 
 */

'use strict';

var _         = require('underscore');
var User      = require('../models/User');
var userRoles = require('../../app/scripts/routingConfig').userRoles;

module.exports = {

    /**
     * 
     * @function update
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     * @description
     * 
     */
    update: function(req, res, next) {

        User.update(req.body, function(err, data) {

            var user = req.body;

            if (err === 'InvalidUserId') {
                return res.status(403).send('Invalid User ID');
            }

            if (err) {
                next(err);
            } else {
                res.json(user);
            }

        });

    },
    /**
     * 
     * @function destroy
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     * @description
     * 
     */
    destroy: function(req, res, next) {

        User.destroy(req.body, function(err, data) {

            if (err) {
                next(err);
            } else {
                res.json({});
            }

        });

    }

};
