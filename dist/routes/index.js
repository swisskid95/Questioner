"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router(); // Get Home Page


router.get('/', function (req, res) {
  res.status(300).redirect('/api/v1/meetups');
});
var _default = router;
exports.default = _default;