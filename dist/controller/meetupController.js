"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _meetups = _interopRequireDefault(require("../models/meetups"));

var _rsvp = _interopRequireDefault(require("../models/rsvp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// Helper functions
// Returns all meetups
var _getMeetups = function getMeetups() {
  return _meetups.default;
}; // returns a specific meetup with id specified


var getMeetupId = function getMeetupId(id) {
  return _meetups.default.find(function (m) {
    return m.id === id;
  });
}; // Filters out the meetups below current date


var getUpcomingMeetup = function getUpcomingMeetup() {
  var today = Date.parse(new Date());

  var upcomingMeetups = _meetups.default.filter(function (m) {
    return Date.parse(m.happeningOn) > today;
  });

  return upcomingMeetups;
}; // create new meetup


var addMeetup = function addMeetup(meetup) {
  var meetupToDb = {};
  var nextId = _meetups.default.length + 1;
  meetupToDb.id = nextId;
  meetupToDb.createdOn = new Date(meetup.createdOn.trim());
  meetupToDb.location = meetup.location.trim();
  meetupToDb.images = _toConsumableArray(meetup.images);
  meetupToDb.topic = meetup.topic.trim();
  meetupToDb.happeningOn = new Date(meetup.happeningOn.trim()); // Push data to meetups

  _meetups.default.push(meetupToDb);

  return [meetupToDb];
}; // push meetup with id to rsvp


var addMeetupToRsvp = function addMeetupToRsvp(id, body) {
  var meetupToRsvp = {}; // Check if id exist in meetup

  var meetupId = getMeetupId(id); // return Null if id doesn't exist in meetup

  if (!meetupId) {
    return;
  } // Generate new id for RSVP


  var nextId = _rsvp.default.length + 1; // extract useful property

  meetupToRsvp.id = nextId;
  meetupToRsvp.meetup = meetupId.id;
  meetupToRsvp.user = body.userId;
  meetupToRsvp.status = body.status; // push data to RSVPs

  _rsvp.default.push(meetupToRsvp); // eslint-disable-next-line consistent-return


  return [meetupToRsvp];
};

var MeetupController =
/*#__PURE__*/
function () {
  function MeetupController() {
    _classCallCheck(this, MeetupController);
  }

  _createClass(MeetupController, null, [{
    key: "getMeetups",

    /**
     * Handle get for the route api/v1/meetups
     * pools all meetups in the meetup record
     *
     * @static getMeetups
     *
     * @param {object} req
     * @param {object} res
     *
     * @memberof MeetupController
     */
    value: function getMeetups(req, res) {
      res.status(200).json({
        status: 200,
        data: _getMeetups()
      });
    }
    /**
     * Handle get for the route api/v1/meetups/:id
     * pools meetup from meetup record with specified id
     *
     * @static getMeetupById
     *
     * @param {object} req
     * @param {object} res
     *
     * @memberof MeetupController
     */

  }, {
    key: "getMeetupById",
    value: function getMeetupById(req, res) {
      var meetupId = parseInt(req.params.id, 10);
      var matchedMeetup = getMeetupId(meetupId);

      if (matchedMeetup) {
        res.status(200).json({
          status: 200,
          data: [matchedMeetup]
        });
      } else {
        res.status(404).json({
          status: 404,
          error: "meetup with id: ".concat(meetupId, " does not exist in record")
        });
      }
    }
    /**
     * Handle post for the route api/v1/meetups
     * creates new meetup and adds it to meetup record
     *
     * @static createMeetup
     *
     * @param {object} req
     * @param {object} res
     *
     * @memberof MeetupController
     */

  }, {
    key: "createMeetup",
    value: function createMeetup(req, res) {
      // selecting only needed properties
      var _req$body = req.body,
          createdOn = _req$body.createdOn,
          location = _req$body.location,
          images = _req$body.images,
          topic = _req$body.topic,
          happeningOn = _req$body.happeningOn; // Validating input

      if (!createdOn || !location || !topic || !images || !happeningOn || !createdOn.trim() || !location.trim() || !topic.trim() || !happeningOn.trim()) {
        return res.status(400).json({
          status: 400,
          error: 'Invalid request!'
        });
      }

      return res.status(201).json({
        status: 201,
        data: addMeetup({
          createdOn: createdOn,
          location: location,
          images: images,
          topic: topic,
          happeningOn: happeningOn
        })
      });
    }
    /**
     * Handle get for the route api/v1/meetups/upcoming
     * gets all meetups that are yet to occur from record
     *
     * @static getUpcomingMeetups
     *
     * @param {object} req
     * @param {object} res
     *
     * @memberof MeetupController
     */

  }, {
    key: "getUpcomingMeetups",
    value: function getUpcomingMeetups(req, res) {
      var upcommingMeetup = getUpcomingMeetup();

      if (!upcommingMeetup) {
        return res.status(200).json({
          status: 200,
          data: ['There are no upcoming meetups']
        });
      }

      return res.status(200).json({
        status: 200,
        data: upcommingMeetup
      });
    }
    /**
     * Handle post for the route api/v1/meetups/rsvps
     * updates rsvp list with specified meetup id
     *
     * @static addRsvp
     *
     * @param {object} req
     * @param {object} res
     *
     * @memberof MeetupController
     */

  }, {
    key: "addRsvp",
    value: function addRsvp(req, res) {
      var _req$body2 = req.body,
          userId = _req$body2.userId,
          status = _req$body2.status;
      var meetupId = parseInt(req.params.id, 10); // Validating input

      if (!status || !userId) {
        return res.status(400).json({
          status: 400,
          error: 'Required property not given'
        });
      }

      if (typeof userId !== 'number' || typeof status !== 'string') {
        return res.status(400).json({
          status: 400,
          error: 'value type not correct'
        });
      } // fetch specified meetup id and add to RSVP


      var rsvp = addMeetupToRsvp(meetupId, {
        status: status,
        userId: userId
      }); // check if meetup with id exists

      if (!rsvp) {
        return res.status(404).json({
          status: 404,
          error: 'meetup with the specified ID not found'
        });
      } // All conditions met


      return res.status(201).json({
        status: 201,
        data: rsvp
      });
    }
  }]);

  return MeetupController;
}();

var _default = MeetupController;
exports.default = _default;