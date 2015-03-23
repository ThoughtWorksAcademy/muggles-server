'use strict';

var mongoose = require('mongoose')
  , express = require('express')
  , request = require('supertest')
  , app     = require('../../app.js');


var router = express.Router();

var Checkpoint = mongoose.model('Checkpoint');
var Course = mongoose.model('Course');

var _ = require('lodash');


describe('GET /', function () {
  it('should return 200 OK', function (done) {
    request(app)
      .get('/')
      .expect(200, done);
  });
});

describe('POST /api/trainees/login with null user', function () {
  it('should return 401 OK', function (done) {
    request(app)
      .post('/api/trainees/login')
      .expect(401, done);
  });
});

describe('POST /api/trainees/login with user and password', function () {
  it('should return cannot find the username', function (done) {
    request(app)
      .post('/api/trainees/login')
      .send({username: 'Jacobs', password: 'd'})
      .expect('无法找到用户: Jacobs', done)
      .expect(401);
  });
});

describe('POST /api/trainees/login with user', function () {
  it('should return wrong password', function (done) {
    request(app)
      .post('/api/trainees/login')
      .send({username: 'Jacob', password: ' '})
      .expect('密码错误', done)
      .expect(401);
  });
});



