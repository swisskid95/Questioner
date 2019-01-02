"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router(); // Get Home Page


router.get('/', function (req, res) {
  res.send('Questioner says Hello');
});
module.exports = router;