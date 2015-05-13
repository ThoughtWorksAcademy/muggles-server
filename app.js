'use strict';
var fs = require('fs');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/twa-muggles');

fs.readdirSync(__dirname + '/models').forEach(function (file) {
  if (~file.indexOf('.js')) require(__dirname + '/models/' + file);
});

var app = express();
var port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(session({
  secret: 'muggles',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

var passport = require('passport');
var initPassport = require('./passport/init');
initPassport(passport);
app.use(passport.initialize());

// routes
var router = require('./routes');
router(app, passport);

// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//  var err = new Error('Not Found');
//  err.status = 404;
//  next(err);
//});

if (app.get('env') === 'development') {
  app.use(express.static(path.join(__dirname, '../muggles-client')));
  // This covers serving up the index page
  app.use(express.static(path.join(__dirname, '../muggles-client/.tmp')));
  app.use(express.static(path.join(__dirname, '../muggles-client/app')));
  app.use(express.static(path.join(__dirname, '../muggles-client/app/views')));

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  });
}

if (app.get('env') === 'production') {
  app.use(express.static(path.join(__dirname, '/dist')));

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: {}
    });
  });
}
console.log('Express app started on port ' + port);

module.exports = app;
