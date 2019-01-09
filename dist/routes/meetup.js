"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _meetupController = _interopRequireDefault(require("../controller/meetupController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import controller class
var router = _express.default.Router(); //  Get api/v1/meetups


router.get('/', _meetupController.default.getMeetups); // Get api/v1/meetups/upcoming

router.get('/upcoming', _meetupController.default.getUpcomingMeetups); // Get api/v1/meetups/:id

router.get('/:id', _meetupController.default.getMeetupById); // Post api/v1/meetups

router.post('/', _meetupController.default.createMeetup); // Post api/v1/meetups/:id/rsvp

router.post('/:id/rsvps', _meetupController.default.addRsvp);
var _default = router;
exports.default = _default;