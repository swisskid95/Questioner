"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _supertest = _interopRequireDefault(require("supertest"));

var _app = _interopRequireDefault(require("../app"));

var _questions = require("../models/questions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai.default.expect;
describe('Questions Endpoints test', function () {
  it('Test case for get meetups api call', function () {
    // HTTP get request for /api/v1/meetups
    (0, _supertest.default)(_app.default).post('/api/v1/questions').set('accept', 'aplication/json').expect('content/type', /json/).expect(201);
  });
  it('Test case for patch questions by id api call', function () {
    // HTTP patch request for /api/v1/questions/:id/upvote
    (0, _supertest.default)(_app.default).patch('/api/v1/questions/1/upvote').set('accept', 'aplication/json').expect('content/type', /json/).expect(200);
  });
  it('Test case for patch questions by id api call', function () {
    // HTTP patch request for /api/v1/questions/:id/downvote
    (0, _supertest.default)(_app.default).patch('/api/v1/questions/1/downvote').set('accept', 'aplication/json').expect('content/type', /json/).expect(200);
  });
});