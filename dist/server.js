"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || 3000;
var app = (0, _express.default)();
app.listen(port, function () {
  console.log("Starting server on port ".concat(port, "..."));
});