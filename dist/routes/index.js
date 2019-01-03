"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router(); // Get Home Page


router.get('/', function (req, res) {
  res.send('Questioner says Hello');
});
var _default = router;
exports.default = _default;