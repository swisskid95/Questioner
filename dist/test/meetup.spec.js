"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _supertest = _interopRequireDefault(require("supertest"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-undef */
// Import Statement
var expect = _chai.default.expect;
describe('Meetups Endpoints test', function () {
  it('Test case for api call get all meetups  api/v1/meetups', function (done) {
    (0, _supertest.default)(_app.default).get('/api/v1/meetups').set('accept', 'aplication/json').then(function (res) {
      expect(res.status).equal(200);
      expect(res.body.data.length).to.be.greaterThan(0);
      expect(res.body.data).to.be.an('array');
      expect(res.body.data[0].id).equal(1);
    });
    done();
  });
  it('Test case for api call get all upcomming to endpoint api/v1/meetups/upcomming', function (done) {
    (0, _supertest.default)(_app.default).get('/api/v1/meetups/upcoming').set('accept', 'aplication/json').then(function (res) {
      expect(res.status).equal(200);
      expect(Date.parse(res.body.data[0].happeningOn)).to.be.greaterThan(Date.parse(new Date()));
      expect(res.body.data.length).to.be.greaterThan(0);
      expect(res.body.data).to.be.an('array');
    });
    done();
  });
  it('Test case for api call get by id to endpoint api/v1/meetups/1', function (done) {
    (0, _supertest.default)(_app.default).get('/api/v1/meetups/1').set('accept', 'aplication/json').then(function (res) {
      expect(res.status).equal(200);
      expect(res.body.data[0].id).to.equal(1);
      expect(res.body.data.length).to.be.greaterThan(0);
      expect(res.body.data).to.be.an('array');
    });
    done();
  });
  it('Test case for api endpoint api/v1/meetups', function (done) {
    var payload = {
      createdOn: 'June 19, 2018',
      location: '15, Allwhite avenue, Ikotun, Lagos.',
      images: ['http://img1.com', 'http://img2.com', 'http://img3.com'],
      topic: 'meetup 2',
      happeningOn: 'October 1, 2018'
    };
    (0, _supertest.default)(_app.default).post('/api/v1/meetups').send(payload).then(function (res) {
      expect(res.status).to.equal(201);
      expect(res.body.data).to.be.an('array');
    });
    done();
  });
  it('Test case for api call: post by meetupid to endpoint api/v1/meetups/1/rsvps', function (done) {
    var payload = {
      userId: 2,
      status: 'yes'
    };
    (0, _supertest.default)(_app.default).post('/api/v1/meetups/1/rsvps').send(payload).then(function (res) {
      expect(res.body.data[0].user).to.equal(payload.userId);
      expect(res.status).to.equal(201);
    });
    done();
  });
});
describe('Meetups Endpoints error handling test', function () {
  it('Test case for endpoint api/v1/meetups/<meetup> error handling', function (done) {
    (0, _supertest.default)(_app.default).get('/api/v1/meetups/5').set('accept', 'aplication/json').then(function (res) {
      expect(res.status).equal(404);
      expect(res.body.status).to.equal(res.status);
      expect(res.body.error).to.be.a('string');
      expect(res.body.error).to.equal('meetup with id: 5 does not exist in record');
    });
    done();
  });
  it('Test case for api endpoint api/v1/meetups handling error', function (done) {
    var payload = {
      location: '15, Allwhite avenue, Ikotun, Lagos.',
      images: ['http://img1.com', 'http://img2.com', 'http://img3.com'],
      topic: 'meetup 2',
      happeningOn: 'October 1, 2018'
    };
    (0, _supertest.default)(_app.default).post('/api/v1/meetups').send(payload).then(function (res) {
      expect(res.status).to.equal(400);
      expect(res.body.error).to.be.a('string');
      expect(res.body.error).to.equal('Invalid request!');
      expect(res.body.status).to.equal(res.status);
    });
    done();
  });
  it('Test case post request to endpoint api/v1/meetups/1/rsvps error handling', function (done) {
    var payload = {
      userId: 2,
      status: 'yes'
    };
    (0, _supertest.default)(_app.default).post('/api/v1/meetups/7/rsvps').send(payload).then(function (res) {
      expect(res.body.error).to.equal('meetup with the specified ID not found');
      expect(res.status).to.equal(404);
      expect(res.body.status).to.equal(res.status);
    });
    done();
  });
  it('Test case 2nd post request to endpoint api/v1/meetups/1/rsvps error handling', function (done) {
    var payload = {
      userId: 2,
      status: true
    };
    (0, _supertest.default)(_app.default).post('/api/v1/meetups/1/rsvps').send(payload).then(function (res) {
      expect(res.body.error).to.equal('value type not correct');
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal(res.status);
      expect(res.body.error).to.be.a('string');
    });
    done();
  });
  it('Test case 3rd post request to endpoint api/v1/meetups/1/rsvps error handling', function (done) {
    var payload = {
      userId: 2
    };
    (0, _supertest.default)(_app.default).post('/api/v1/meetups/7/rsvps').send(payload).then(function (res) {
      expect(res.body.error).to.equal('Required property not given');
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal(res.status);
      expect(res.body.error).to.be.a('string');
    });
    done();
  });
});