"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _supertest = _interopRequireDefault(require("supertest"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-undef */
var expect = _chai.default.expect;
describe('Questions Endpoints test', function () {
  it('Test case to post a new question to record call', function (done) {
    var payload = {
      createdOn: 'january 5, 2019',
      createdBy: 2,
      meetup: 2,
      title: 'titlesd',
      body: 'it is nice'
    };
    (0, _supertest.default)(_app.default).post('/api/v1/questions').send(payload).set('accept', 'aplication/json').then(function (res) {
      expect('content/type', /json/);
      expect(res.status).to.equal(201);
      expect(res.body.status).to.equal(res.status);
      expect(res.body.data).to.be.an('array');
    });
    done();
  });
  it('Test case for patch questions by id api call', function (done) {
    (0, _supertest.default)(_app.default).patch('/api/v1/questions/1/upvote').set('accept', 'aplication/json').then(function (res) {
      expect('content/type', /json/);
      expect(res.status).to.equal(200);
      expect(res.body.data).to.be.an('array');
      expect(res.body.status).to.equal(res.status);
    });
    done();
  });
  it('Test case for patch questions by id api call', function (done) {
    (0, _supertest.default)(_app.default).patch('/api/v1/questions/1/downvote').set('accept', 'aplication/json').then(function (res) {
      expect('content/type', /json/);
      expect(res.status).to.equal(200);
      expect(res.body.data).to.be.an('array');
      expect(res.body.status).to.equal(res.status);
    });
    done();
  });
});
describe('Error handling on questions Endpoints', function () {
  it('Test case for question', function (done) {
    (0, _supertest.default)(_app.default).patch('/api/v1/questions/99/upvote').set('accept', 'aplication/json').then(function (res) {
      expect('content/type', /json/);
      expect(res.status).to.equal(400);
      expect(res.body.error).to.be.a('string');
      expect(res.body.status).to.equal(res.status);
      expect(res.body.error).to.equal('no question with specified id');
    });
    done();
  });
  it('Test case for missing property', function (done) {
    var payload = {
      createdBy: 2,
      meetup: 2,
      title: 'titlesd',
      body: 4
    };
    (0, _supertest.default)(_app.default).post('/api/v1/questions').send(payload).set('accept', 'aplication/json').then(function (res) {
      expect('content/type', /json/);
      expect(res.status).to.equal(400);
      expect(res.body.error).to.be.a('string');
      expect(res.body.status).to.equal(res.status);
      expect(res.body.error).to.equal('Missing required property');
    });
    done();
  });
  it('Test case for invalid value type', function (done) {
    var payload = {
      createdOn: 'january 5, 2019',
      createdBy: 2,
      meetup: 2,
      title: 'titlesd',
      body: 4
    };
    (0, _supertest.default)(_app.default).post('/api/v1/questions').send(payload).set('accept', 'aplication/json').then(function (res) {
      expect('content/type', /json/);
      expect(res.status).to.equal(400);
      expect(res.body.error).to.be.a('string');
      expect(res.body.status).to.equal(res.status);
      expect(res.body.error).to.equal('value type not correct');
    });
    done();
  });
  it('Test case for question id not found downvote', function (done) {
    (0, _supertest.default)(_app.default).patch('/api/v1/questions/99/downvote').set('accept', 'aplication/json').then(function (res) {
      expect('content/type', /json/);
      expect(res.status).to.equal(400);
      expect(res.body.error).to.be.a('string');
      expect(res.body.status).to.equal(res.status);
    });
    done();
  });
});