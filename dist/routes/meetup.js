"use strict";

var _express = _interopRequireDefault(require("express"));

var _meetups = _interopRequireDefault(require("../models/meetups"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.get('/', function (req, res) {
  res.status(200).json({
    status: 200,
    data: (0, _meetups.default)()
  });
});
module.exports = router;