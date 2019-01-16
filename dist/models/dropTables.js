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

// Defining Meetup table and column
// creates meetup table
var dropTables =
/*#__PURE__*/
function () {
  function dropTables() {
    _classCallCheck(this, dropTables);
  }

  _createClass(dropTables, null, [{
    key: "dropQuestionTable",

    /**
     *Drops Table for easy clear
     *
     * @static dropQuestionTable
     *
     * @memberof dropTables
     */
    value: function dropQuestionTable() {
      var queryText = 'DROP TABLE IF EXISTS Question';

      _db.default.query(queryText).then(function (res) {
        console.log(res);
      }).catch(function (err) {
        console.log(err);
      });
    }
  }, {
    key: "dropMeetupTable",
    value: function dropMeetupTable() {
      var queryText = 'DROP TABLE IF EXISTS Meetup';

      _db.default.query(queryText).then(function (res) {
        console.log(res);
      }).catch(function (err) {
        console.log(err);
      });
    }
  }, {
    key: "dropRsvpTable",
    value: function dropRsvpTable() {
      var queryText = 'DROP TABLE IF EXISTS Rsvp';

      _db.default.query(queryText).then(function (res) {
        console.log(res);
      }).catch(function (err) {
        console.log(err);
      });
    }
  }, {
    key: "dropUserTable",
    value: function dropUserTable() {
      var queryText = 'DROP TABLE EXISTS Meetup';

      _db.default.query(queryText).then(function (res) {
        console.log(res);
      }).catch(function (err) {
        console.log(err);
      });
    }
  }]);

  return dropTables;
}();

var _default = dropTables;
exports.default = _default;