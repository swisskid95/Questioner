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
  }); // it('Test case for get meetups by id api call', () => {
  //   // HTTP get request for /api/v1/meetups
  //   request(app)
  //     .get('/api/v1/meetups/1')
  //     .set('accept', 'aplication/json')
  //     .expect('content/type', /json/)
  //     .expect(200);
  // });
  // it('Test case for post meetups api call', () => {
  //   // HTTP post request for /api/v1/meetups
  //   request(app)
  //     .post('/api/vi/meetups')
  //     .set('accept', 'aplication/json')
  //     .expect('content/type', /json/)
  //     .expect(201);
  // });
});