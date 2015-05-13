'use strict';

var fs = require('fs');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/twa-muggles-test', function (err) {
  if (err) {
    console.log('connection error', err);
  } else {
    console.log('connection successful');
  }
});

var modules_path = '/Users/zhzhang/Documents/project/muggleProject/muggles-server/models';
fs.readdirSync(modules_path).forEach(function (file) {
  if (~file.indexOf('.js')) require(modules_path + '/' + file);
});

var chai = require('chai');
global.expect = chai.expect;

var sinonChai = require('sinon-chai');
chai.use(sinonChai);

global.request = require('supertest');
global.sinon = require('sinon');
global.reloadDatabase = require('./helper/reloadDatabase');


