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
      expect(res.body.data[0].id).equal(1);
    }).catch(function (error) {
      throw error;
    });
    done();
  });
  it('Test case for api call get all upcomming to endpoint api/v1/meetups/upcomming', function (done) {
    (0, _supertest.default)(_app.default).get('/api/v1/meetups/upcoming').set('accept', 'aplication/json').then(function (res) {
      expect(res.status).equal(200);
      expect(res.body.data.length).to.be.greaterThan(0);
    }).catch(function (error) {
      throw error;
    });
    done();
  });
  it('Test case for api call get by id to endpoint api/v1/meetups/1', function (done) {
    (0, _supertest.default)(_app.default).get('/api/v1/meetups/1').set('accept', 'aplication/json').then(function (res) {
      expect(res.status).equal(200);
      expect(res.body.data[0].id).to.equal(1);
      expect(res.body.data.length).to.be.greaterThan(0);
    }).catch(function (error) {
      throw error;
    });
    done();
  });
  it('Test case for api endpoint api/v1/meetups', function (done) {
    var payload = {
      createdOn: 'June 19, 2018',
      location: '15, Allwhite avenue, Ikotun, Lagos.',
      images: ['http://img1.com', 'http://img2.com', 'http://img3.com'],
      topic: 'meetup 2',
      happeningOn: 'October 1, 2019'
    };
    (0, _supertest.default)(_app.default).post('/api/v1/meetups').send(payload).then(function (res) {
      expect(res.status).to.equal(201);
    }).catch(function (error) {
      throw error;
    });
    done();
  });
});
describe('Meetups Endpoints error handling test', function () {
  it('Test case for endpoint api/v1/meetups/<meetup> error handling', function (done) {
    (0, _supertest.default)(_app.default).get('/api/v1/meetups/55').set('accept', 'aplication/json').then(function (res) {
      expect(res.status).equal(404);
      expect(res.body.status).to.equal(res.status);
    }).catch(function (error) {
      throw error;
    });
    done();
  });
  it('1st Test case for api endpoint api/v1/meetups handling error', function (done) {
    var payload = {
      location: '15, Allwhite avenue, Ikotun, Lagos.',
      images: ['http://img1.com', 'http://img2.com', 'http://img3.com'],
      topic: 'meetup 2'
    };
    (0, _supertest.default)(_app.default).post('/api/v1/meetups').send(payload).then(function (res) {
      expect(res.status).to.equal(400);
      expect(res.body.error).to.equal('required properties not given!');
      expect(res.body.status).to.equal(res.status);
    }).catch(function (error) {
      throw error;
    });
    done();
  });
});