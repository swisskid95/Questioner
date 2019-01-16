"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _db = _interopRequireDefault(require("../db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
      _db.default.query('SELECT * FROM meetups', function (error, response) {
        if (error) {
          response.status(500).json({
            status: 500,
            error: [error.message]
          });
        }

        if (response) {
          res.status(200).json({
            status: 200,
            data: response.rows
          });
        }
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

      _db.default.query("SELECT * FROM meetups WHERE id = ".concat(meetupId), function (error, response) {
        if (error) {
          return res.status(500).json({
            status: 500,
            error: [error.message]
          });
        }

        if (response) {
          if (!response.rows[0]) {
            return res.status(404).json({
              status: 404,
              error: ["meetup with ID: ".concat(meetupId, " does not exist in record")]
            });
          }

          if (response) {
            res.status(200).json({
              status: 200,
              data: response.rows
            });
          }
        }
      });
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
          location = _req$body.location,
          images = _req$body.images,
          topic = _req$body.topic,
          happeningOn = _req$body.happeningOn;
      var parsedDate = Date.parse(new Date(happeningOn)); // Validating input

      if (parsedDate <= Date.parse((0, _moment.default)()) || !(0, _moment.default)(parsedDate).isValid) {
        return res.status(400).json({
          status: 400,
          error: ['HappeningOn can not be less or equal to todays date']
        });
      }

      if (!location || !topic || !images || !happeningOn) {
        return res.status(400).json({
          status: 400,
          error: 'required properties not given!'
        });
      }

      if (typeof location !== 'string' || typeof topic !== 'string' || typeof happeningOn !== 'string' || _typeof(images) !== 'object') {
        return res.status(400).json({
          status: 400,
          error: 'The Value types not supported'
        });
      }

      _db.default.query('INSERT INTO meetups(location, happening_on, topic, images)  VALUES($1, $2, $3, $4) RETURNING *', [location, happeningOn, topic, images], function (error, response) {
        if (error) {
          if (error.message === "invalid input syntax for type date: \"".concat(happeningOn, "\"")) {
            return res.status(400).json({
              status: 400,
              error: ["happeningOn: ".concat(happeningOn, " should follow this date format: \"August 3, 2013\"")]
            });
          }

          return res.status(500).json({
            status: 500,
            error: [error.message]
          });
        }

        if (response) {
          return res.status(201).json({
            status: 201,
            message: [response.rows[0]]
          });
        }
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
      _db.default.query('SELECT * FROM meetups WHERE happening_on > NOW()', function (error, response) {
        if (error) {
          res.status(500).json({
            status: 500,
            error: [error.message]
          });
        }

        if (response) {
          res.status(200).json({
            status: 200,
            data: response.rows
          });
        }
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
      // const rsvp =


      _db.default.query("SELECT * FROM meetups WHERE id = ".concat(meetupId), function (error, response) {
        if (error) {
          return res.status(500).json({
            status: 500,
            error: [error.message]
          });
        }

        if (response) {
          if (!response.rows[0]) {
            return res.status(404).json({
              status: 404,
              error: ["meetup with ID: ".concat(meetupId, " does not exist in record")]
            });
          }
        }
      });
    }
  }]);

  return MeetupController;
}();

var _default = MeetupController;
exports.default = _default;