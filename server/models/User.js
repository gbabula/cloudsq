/**
 * 
 * @module User
 * @author Greg Babula [gbabula@gmail.com]
 * @description primary user model
 * 
 */


'use strict';


var _                    = require('underscore');
var mongodb              = require('mongolab-provider');
var https                = require('https');
var uuid                 = require('node-uuid');
var passport             = require('passport');
var LocalStrategy        = require('passport-local').Strategy;
var userRoles            = require('../../app/scripts/routingConfig').userRoles;
var banedUsername        = require('../../app/scripts/userConfig').banned;
var reservedUsername     = require('../../app/scripts/userConfig').reserved;

var db = mongodb.init('cloudsquare', 'xxydQzl_CxzcdncUA7mzkxry37vG3-ZB');
var collection = 'users';
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

    user.id = uuid.v4();
    user.role = userRoles.user;

    users.push(user);

    db.insert(collection, user, function(err, data) {

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

    db.documents(collection, {}, function(err, data) {

        users = data;

    });

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
function update(user, callback) {

    if (!findById(user.id)) {
        return callback('InvalidUserId');
    }

    db.updateId(collection, user.id, user, function(err, data) {

        callback(null, data);

    });

}

/**
 * 
 * @function destroy
 * @description
 * 
 */
function destroy(user, callback) {

    db.deleteId(collection, user.id, function(err, data) {

        // TODO
        // fix document not found issue
        console.log('destroy');
        console.log(err);
        console.log(data);

        callback(null, data);

    });

}

/**
 * 
 * @function findById
 * @param {String} id
 * @description 
 * @returns {}
 * 
 */
function findById(id) {

    return _.clone(_.find(users, function(user) { return user.id === id; }));

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

    done(null, user.id);

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
    update: update,
    destroy: destroy,
    findAll: findAll,
    indexAll: indexAll,
    findById: findById,
    findByEmail: findByEmail,
    findByUsername: findByUsername,
    localStrategy: localStrategy,
    serializeUser: serializeUser,
    deserializeUser: deserializeUser
};
