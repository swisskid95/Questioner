"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _index = _interopRequireDefault(require("./routes/index"));

var _meetup = _interopRequireDefault(require("./routes/meetup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import Routes
var app = (0, _express.default)(); // Set to env Port value for availability

var port = process.env.PORT || 3000; // Using bodyParser to accept JSON and url encoded values

app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
})); // Setting the routes

app.use('/api/v1', _index.default);
app.use('/api/v1/meetups', _meetup.default);
app.listen(port, function () {
  console.log("Starting server on port ".concat(port, "..."));
});
module.exports = app;