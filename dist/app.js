"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _index = _interopRequireDefault(require("./routes/index"));

var _meetup = _interopRequireDefault(require("./routes/meetup"));

var _question = _interopRequireDefault(require("./routes/question"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import Routes
var app = (0, _express.default)(); // Set to env Port value for availability

var port = process.env.PORT || 3000; // Using bodyParser to accept JSON and url encoded values

app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
})); // Set up all routes

app.use('/api/v1', _index.default);
app.use('/api/v1/meetups', _meetup.default);
app.use('/api/v1/questions', _question.default);
app.listen(port, function () {
  // eslint-disable-next-line no-console
  console.log("Starting server on port ".concat(port, "..."));
});
var _default = app;
exports.default = _default;