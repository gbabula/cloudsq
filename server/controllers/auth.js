/**
 * 
 * @module auth
 * @author Greg Babula [gbabula@gmail.com]
 * @description authorization controller
 * 
 */


'use strict';


var passport   = require('passport');
var User       = require('../models/User.js');


module.exports = {

    /**
     * @method register
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     * @description 
     */
    register: function(req, res, next) {

        User.addUser(req.body, function(err, data) {

            // var user = data;
            var user = req.body;

            // console.log('USER ADD USER ---', user);

            if (err === 'UserEmailAlreadyExists') {
                return res.status(403).send('Email already registered');
            }

            if (err === 'UserAlreadyExists') {
                return res.status(403).send('User already exists');
            }

            if (err === 'UserNameBanned') {
                return res.status(403).send('Username is banned');
            } else if (err) {
                return res.status(500).end();
            }

            // console.log('register', user);

            req.logIn(user, function(err) {

                if (err) {
                    next(err);
                } else {
                    // res.json(200, user);
                    res.json(user);
                }

            });

        });

    },
    /**
     * @method login
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     * @description 
     */
    login: function(req, res, next) {

        /**
         * @param {} err
         * @param {Object} user
         * @param {Object} info 
         * @description authenticates based on data from the LocalStrategy
         */
        passport.authenticate('local', function(err, user, info) {

            if (err)     { return next(err); }
            if (!user)   { return res.status(400).send(info.message); }

            req.logIn(user, function(err) {

                if (err) {
                    return next(err);
                }

                // TODO fix
                if (req.body.rememberme) {
                    // req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7;
                    // res.cookie('user', user, { maxAge: 1000 * 60 * 60 * 24 * 7 });
                }

                // res.json(200, user);
                res.json(user);

            });

        })(req, res, next);

    },
    /**
     * @method logout
     * @param {Object} req
     * @param {Object} res
     * @description 
     */
    logout: function(req, res) {

        req.logout();
        res.status(200).end();

    }

};
