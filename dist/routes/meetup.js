"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _lodash = _interopRequireDefault(require("lodash"));

var _meetups = require("../models/meetups");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router(); //  Get api/v1/meetups


router.get('/', function (req, res) {
  res.status(200).json({
    status: 200,
    data: (0, _meetups.getMeetups)()
  });
}); // Post api/v1/meetups

router.post('/', function (req, res) {
  var body = _lodash.default.pick(req.body, 'createdOn', 'location', 'images', 'topic', 'happeningOn');

  if (!body.createdOn.trim() || !body.location.trim() || !body.topic.trim() || !body.images.trim() || !body.happeningOn.trim()) {
    return res.status(400).json({
      status: 400,
      error: "Invalid request!"
    });
  }

  res.status(201).json({
    status: 201,
    body: (0, _meetups.addMeetup)(body)
  });
});
var _default = router;
exports.default = _default;