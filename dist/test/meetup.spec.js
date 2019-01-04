"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _supertest = _interopRequireDefault(require("supertest"));

var _app = _interopRequireDefault(require("../app"));

var _meetups = require("../models/meetups");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-undef */
// Import Statement
var expect = _chai.default.expect;
describe('Model functions for interacting with fake db', function () {
  it('Test case for function getMeetup', function () {
    // Test getmetup return value type
    expect((0, _meetups.getMeetups)()).be.a('array');
  });
  it('Test case for addMeetup', function () {
    expect((0, _meetups.addMeetup)({
      createdOn: 'June 19, 2018',
      location: '15, Allwhite avenue, Ikotun, Lagos.',
      images: ['http://img1.com', 'http://img2.com', 'http://img3.com'],
      topic: 'meetup 2',
      happeningOn: 'October 1, 2018'
    })).be.lengthOf(1);
  });
});
describe('Meetups Endpoints test', function () {
  it('Test case for get meetups api call', function () {
    // HTTP get request for /api/v1/meetups
    (0, _supertest.default)(_app.default).get('/api/v1/meetups').set('accept', 'aplication/json').expect('content/type', /json/).expect(200);
  });
  it('Test case for get meetups by id api call', function () {
    // HTTP get request for /api/v1/meetups
    (0, _supertest.default)(_app.default).get('/api/v1/meetups/1').set('accept', 'aplication/json').expect('content/type', /json/).expect(200);
  });
  it('Test case for post meetups api call', function () {
    // HTTP post request for /api/v1/meetups
    (0, _supertest.default)(_app.default).post('/api/vi/meetups').set('accept', 'aplication/json').expect('content/type', /json/).expect(201);
  });
});