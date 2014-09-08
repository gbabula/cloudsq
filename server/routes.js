/**
 *
 * @module routes
 * @author Greg Babula [gbabula@gmail.com]
 * @description backend routes
 * 
 */


'use strict';


var _            = require('underscore');
var path         = require('path');
var passport     = require('passport');
var AuthCtrl     = require('./controllers/auth');
var UserCtrl     = require('./controllers/user');
var User         = require('./models/User.js');
var userRoles    = require('../app/scripts/routingConfig').userRoles;
var accessLevels = require('../app/scripts/routingConfig').accessLevels;


var routes = [
    {
        path: '/partials/*',
        httpMethod: 'GET',
        middleware: [function (req, res) {
            var requestedView = path.join('./', req.url);
            res.render(requestedView);
        }],
        accessLevel: accessLevels.public
    },
    {
        path: '/register',
        httpMethod: 'POST',
        middleware: [AuthCtrl.register],
        accessLevel: accessLevels.public
    },
    {
        path: '/login',
        httpMethod: 'POST',
        middleware: [AuthCtrl.login],
        accessLevel: accessLevels.public
    },
    {
        path: '/logout',
        httpMethod: 'POST',
        middleware: [AuthCtrl.logout],
        accessLevel: accessLevels.public
    },
    {
        path: '/users',
        httpMethod: 'GET',
        middleware: [UserCtrl.index],
        accessLevel: accessLevels.public
    },
    // {
    //     path: '/users',
    //     httpMethod: 'GET',
    //     middleware: [ensureAuthenticated, ensureAuthorized, UserCtrl.index],
    //     accessLevel: accessLevels.admin
    // },
    // All other get requests should be handled by AngularJS's client-side routing system
    {
        path: '/*',
        httpMethod: 'GET',
        middleware: [function(req, res) {
            var role = userRoles.public,
                username = '',
                _id = {
                    $oid: ''
                };

            if (req.user) {
                console.log('req user', req.user);
                role = req.user.role;
                username = req.user.username;
                _id = req.user._id;
            }

            res.cookie('user', JSON.stringify({
                'role': role,
                'username': username,
                '_id': _id
            }));

            // console.log('render');
            // console.log(username, _id);

            res.render('index');
        }],
        accessLevel: accessLevels.public
    }
];

module.exports = function(app) {
    _.each(routes, function(route) {
        var args = _.flatten([route.path, route.middleware]);

        switch(route.httpMethod.toUpperCase()) {
            case 'GET':
                app.get.apply(app, args);
                break;
            case 'POST':
                app.post.apply(app, args);
                break;
            case 'PUT':
                app.put.apply(app, args);
                break;
            case 'DELETE':
                app.delete.apply(app, args);
                break;
            default:
                throw new Error('Invalid HTTP method specified for route ' + route.path);
                break;
        }
    });
};

/**
 *
 * @function ensureAuthenticated
 * @param {} req
 * @param {} res
 * @param {} next
 * @description
 * 
 */
function ensureAuthenticated(req, res, next) {

    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.status(401).end();
    }

};

/**
 *
 * @function ensureAuthorized
 * @param {} req
 * @param {} res
 * @param {} next
 * @description
 * 
 */
function ensureAuthorized(req, res, next) {

    if (!req.user) {
        return res.status(401).end();
    }

    var accessLevel = _.findWhere(routes, { path: req.route.path }).accessLevel || accessLevels.public;

    if (!(accessLevel & req.user.role)) {
        return res.status(403).end();
    }

    return next();

};
