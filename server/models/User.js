/**
 * 
 * @module User Model
 * @author Greg Babula [gbabula@gmail.com]
 * @description
 * 
 */


'use strict';


var mongodb              = require('mongolab-provider');
var _                    = require('underscore');
var https                = require('https');
var passport             = require('passport');
var LocalStrategy        = require('passport-local').Strategy;
var userRoles            = require('../../app/scripts/routingConfig').userRoles;
var banedUsername        = require('../../app/scripts/userConfig').banned;
var reservedUsername     = require('../../app/scripts/userConfig').reserved;


// var db = mongodb.init('cloudsquare', 'PL9agN5Yt_9suIEYRQPNn5Z3x2vxlGZj');
var db = mongodb.init('cloudsqmain', 'PL9agN5Yt_9suIEYRQPNn5Z3x2vxlGZj');


var users = [];
var localStrategy;

/**
 * 
 * @function addUser
 * @param {Object} user
 * @param {Function} callback
 * @description validates user and adds user object to database
 * 
 */
function addUser(user, callback) {

    user = user || {};

    if (findByEmail(user.email) !== undefined) {
        return callback('UserEmailAlreadyExists');
    }

    if (findByUsername(user.username) !== undefined) {
        return callback('UserAlreadyExists');
    }

    if (filterUsername(user.username) !== undefined) {
        return callback('UserNameBanned');
    }

    user.role = userRoles.user;

    users.push(user);

    db.insert('users', user, function(err, data) {

        callback(null, data);

    });

}

/**
 * 
 * @function findAll
 * @description returns all users from database
 * @returns {Array} users
 * 
 */
function findAll() {

    db.documents('list', {}, function(err, data) {

        users = data;

    });

    // db.documents('users', {}, function(err, data) {

        // users = data;

    // });

    return users;

}

/**
 * 
 * @function indexAll
 * @description returns clean users Array for client
 * @returns {Array} users
 * 
 */
function indexAll() {

    return _.map(findAll(), function(user) {
        delete user.password;
        return _.clone(user);
    });

}

/**
 * 
 * @function update
 * @description
 * 
 */
// function update() {

    // db.insert('users', user, function(err, data) {

        // callback(null, data);

    // });

    // db.update('list', {}, function(err, data) {

        // users = data;

    // });

// }

/**
 * 
 * @function deleteId
 * @description
 * 
 */
// function deleteId(id) {

    // db.deleteId('users', id, function(err, data) {

        // callback(null, data);

    // });

    // db.deleteId('list', id, function(err, data) {

        // callback(null, data);

    // });

// }

/**
 * 
 * @function findById
 * @param {} id
 * @description 
 * @returns {}
 * 
 */
function findById(id) {

    return _.clone(_.find(users, function(user) { return user._id === id; }));

}

/**
 * 
 * @function findByEmail
 * @param {} email
 * @description 
 * @returns {}
 * 
 */
function findByEmail(email) {

    return _.clone(_.find(users, function(user) { return user.email === email; }));

}

/**
 * 
 * @function findByUsername
 * @param {} username
 * @description 
 * @returns {}
 * 
 */
function findByUsername(username) {

    return _.clone(_.find(users, function(user) { return user.username === username; }));

}

/**
 * 
 * @function filterUsername
 * @param {} username
 * @description 
 * @returns {}
 * 
 */
function filterUsername(username) {

    return _.clone(_.find(banedUsername, function(word) { return (username.indexOf(word) !== -1); }));

}

/**
 * 
 * @function serializeUser
 * @param {Object} user
 * @param {Function} done
 * @description Passport session setup.
 * To support persistent login sessions, Passport needs to be able to
 * serialize users into and deserialize users out of the session.  Typically,
 * this will be as simple as storing the user ID when serializing, and finding
 * the user by ID when deserializing.
 * 
 */
function serializeUser(user, done) {

    done(null, user._id);

};

/**
 * 
 * @function deserializeUser
 * @param {} id
 * @param {Function} done
 * @description 
 * 
 */
function deserializeUser(id, done) {

    var user = findById(id);

    if (user) {
        done(null, user);
    } else {
        done(null, false);
    }

};

// Use the LocalStrategy within Passport.
// Strategies in passport require a `verify` function, which accept
// credentials (in this case, a username and password), and invoke a callback
// with a user object.  In the real world, this would query a database;
// however, in this example we are using a baked-in set of users.
localStrategy = new LocalStrategy(

    function(username, password, done) {

        var user = module.exports.findByUsername(username);

        // console.log('user', user);
        // console.log('username', username);
        // console.log('password', password);

        if (!user) {
            done(null, false, { message: 'Incorrect username.' });
        } else if (user.password != password) {
            done(null, false, { message: 'Incorrect password.' });
        } else {
            return done(null, user);
        }

    }

);


module.exports = {
    addUser: addUser,
    findAll: findAll,
    indexAll: indexAll,
    findById: findById,
    findByEmail: findByEmail,
    findByUsername: findByUsername,
    localStrategy: localStrategy,
    serializeUser: serializeUser,
    deserializeUser: deserializeUser
};
