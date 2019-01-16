"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

var pool = new _pg.Pool({
  connectionstring: process.env.DATABASE_URL
}); // Defining Meetup table and column
// creates meetup table

var createMeetupTable = function createMeetupTable() {
  var queryText = "CREATE TABLE IF NOT EXITS\n      Meetup(\n        MeetupID SERIAL PRIMARY KEY,\n        Location TEXT NOT NULL,\n        CreatedOn TIMESTAMP,\n        HappeningOn DATE NOT NULL,\n        Topic TEXT NOT NULL,\n        Images TEXT []\n      )";
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  }).catch(function (err) {
    console.log(err);
    pool.end();
  });
};

var dropMeetupTable = function dropMeetupTable() {
  var queryText = 'DROP TABLE IF EXIST Meetup';
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  }).catch(function (err) {
    console.log(err);
    pool.end();
  });
};

pool.on('remove', function () {
  console.log('Client removed');
  process.end();
});
var _default = {
  createMeetupTable: createMeetupTable,
  dropMeetupTable: dropMeetupTable,
  pool: pool
};
exports.default = _default;

require('make-runnable');