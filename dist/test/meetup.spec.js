"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _app = _interopRequireDefault(require("../app"));

var _supertest = _interopRequireDefault(require("supertest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import Statement
var should = _chai.default.should;
describe('Meetups Endpoints test', function () {
  it('Test case for meetups api call', function () {
    // HTTP get request for /api/v1/meetups
    (0, _supertest.default)(_app.default).get('/api/v1/meetups').set('accept', 'aplication/json').expect('content/type', /json/).expect(200);
  });
});