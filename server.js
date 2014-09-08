/**
 *
 * @module server
 * @author Greg Babula [gbabula@gmail.com]
 * @description
 * 
 */


'use strict';


var express        = require('express');
var connect        = require('connect');
var morgan         = require('morgan');
var cookieParser   = require('cookie-parser');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var serveStatic    = require('serve-static');
var session        = require('cookie-session');
var http           = require('http');
var passport       = require('passport');
var path           = require('path');
var User           = require('./server/models/User');

var app            = express();
var server         = http.createServer(app);


app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(methodOverride());
app.use(serveStatic(path.join(__dirname, 'app')));
app.use(session({ secret: 'Cloud' }));

// setup passport
passport.use(User.localStrategy);
passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);

// init passport
app.use(passport.initialize());
app.use(passport.session());

// add routes
require('./server/routes.js')(app);

// server
app.set('port', process.env.PORT || 8000);

server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
