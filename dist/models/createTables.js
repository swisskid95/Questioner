"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("../db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var createTables =
/*#__PURE__*/
function () {
  function createTables() {
    _classCallCheck(this, createTables);
  }

  _createClass(createTables, null, [{
    key: "createMeetupTable",

    /**
     *Runs the query to create table for meetups
     *
     * @static createMeetupTable
     * @memberof createTables
     */
    value: function createMeetupTable() {
      var queryText = "CREATE TABLE IF NOT EXISTS meetups(\n      id SERIAL PRIMARY KEY,\n      location TEXT NOT NULL,\n      created_on DATE DEFAULT NOW(),\n      happening_on DATE NOT NULL,\n      topic TEXT NOT NULL,\n      images text[]\n    )";

      _db.default.query(queryText).then(function (res) {
        console.log(res);
      }).catch(function (err) {
        console.log(err);
      });
    }
    /**
     *Runs the query to create table in database for question
     *
     * @static createQuestionTable
     * @memberof createTables
     */

  }, {
    key: "createQuestionTable",
    value: function createQuestionTable() {
      var queryText = "CREATE TABLE IF NOT EXISTS questions(\n      id SERIAL PRIMARY KEY,\n      created_on DATE DEFAULT NOW(),\n      created_by INT REFERENCES users(id) NOT NULL,\n      meetup_id INT REFERENCES meetups(id) NOT NULL,\n      title TEXT NOT NULL,\n      body TEXT NOT NULL,\n      votes INTEGER DEFAULT 0\n      )";

      _db.default.query(queryText).then(function (res) {
        console.log(res);
      }).catch(function (err) {
        console.log(err);
      });
    }
    /**
     *Runs the query to create table for Rsvp
     *
     * @static createRsvpTable
     * @memberof createTables
     */

  }, {
    key: "createRsvpTable",
    value: function createRsvpTable() {
      var queryText = "CREATE TABLE IF NOT EXISTS rsvps(\n        id SERIAL PRIMARY KEY,\n        meetup_id INT REFERENCES meetups(id) NOT NULL,\n        user_id INT REFERENCES users(id) NOT NULL,\n        Response TEXT NOT NULL\n      )";

      _db.default.query(queryText).then(function (res) {
        console.log(res);
      }).catch(function (err) {
        console.log(err);
      });
    }
    /**
     *Runs the query to create table for User
     *
     * @static createUserTable
     *
     * @memberof createTables
     */

  }, {
    key: "createUserTables",
    value: function createUserTables() {
      var queryText = "CREATE TABLE IF NOT EXISTS users(\n        id SERIAL PRIMARY KEY,\n        first_name TEXT NOT NULL,\n        last_name TEXT NOT NULL,\n        other_name TEXT,\n        email TEXT NOT NULL,\n        Phone_number TEXT NOT NULL,\n        registered DATE DEFAULT NOW(),\n        topic TEXT NOT NULL,\n        is_admin BOOLEAN DEFAULT FALSE\n      )";

      _db.default.query(queryText).then(function (res) {
        console.log(res);
      }).catch(function (err) {
        console.log(err);

        _db.default.end();
      });
    }
  }]);

  return createTables;
}();

var _default = createTables;
exports.default = _default;