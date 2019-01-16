"use strict";

var _createTables = _interopRequireDefault(require("./models/createTables"));

var _dropTables = _interopRequireDefault(require("./models/dropTables"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createTable = function createTable() {
  _createTables.default.createMeetupTable();

  _createTables.default.createQuestionTable();

  _createTables.default.createRsvpTable();

  _createTables.default.createUserTables();
};

var dropTable = function dropTable() {
  _dropTables.default.dropMeetupTable();

  _dropTables.default.dropQuestionTable();

  _dropTables.default.dropRsvpTable();

  _dropTables.default.dropUserTable();
};

dropTable();
createTable();