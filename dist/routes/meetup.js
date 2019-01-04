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
}); // Get api/v1/meetups/upcoming

router.get('/upcoming', function (req, res) {
  var upcommingMeetup = (0, _meetups.getUpcomingMeetup)();

  if (!upcommingMeetup) {
    return res.status(200).json({
      status: 200,
      data: ['There are no upcoming ']
    });
  }

  return res.status(200).json({
    status: 200,
    data: upcommingMeetup
  });
}); // Get api/v1/meetups/:id

router.get('/:id', function (req, res) {
  var meetupId = parseInt(req.params.id, 10);
  var matchedMeetup = (0, _meetups.getMeetupId)(meetupId);

  if (matchedMeetup) {
    res.status(200).json({
      status: 200,
      data: matchedMeetup
    });
  } else {
    res.status(400).json({
      status: 400,
      error: "meetup with id: ".concat(meetupId, " does not exist in record")
    });
  }
}); // Post api/v1/meetups

router.post('/', function (req, res) {
  // selecting only needed properties
  var body = _lodash.default.pick(req.body, 'createdOn', 'location', 'images', 'topic', 'happeningOn'); // Validating input


  if (!body.createdOn.trim() || !body.location.trim() || !body.topic.trim() || !body.images || !body.happeningOn.trim()) {
    return res.status(400).json({
      status: 400,
      error: 'Invalid request!'
    });
  } // All things being equal


  return res.status(201).json({
    status: 201,
    body: (0, _meetups.addMeetup)(body)
  });
}); // Post api/v1/meetups/:id/rsvp

router.post('/:id/rsvps', function (req, res) {
  var body = _lodash.default.pick(req.body, 'status', 'userId');

  var meetupId = parseInt(req.params.id, 10); // Validating input

  if (!body.status || !body.userId) {
    return res.status(400).json({
      status: 400,
      error: 'Required property not given'
    });
  }

  if (!_lodash.default.isInteger(body.userId) || !_lodash.default.isString(body.status)) {
    return res.status(400).json({
      status: 400,
      error: 'value type not correct'
    });
  } // fetch specified meetup id and add to RSVP


  var rsvp = (0, _meetups.addMeetupToRsvp)(meetupId, body); // check if meetup with id exists

  if (!rsvp) {
    return res.status(404).json({
      status: 404,
      error: 'meetup with the specified ID not found'
    });
  } // All condition met


  return res.status(200).json({
    status: 200,
    data: rsvp
  });
});
var _default = router;
exports.default = _default;