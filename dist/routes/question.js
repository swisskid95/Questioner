"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _lodash = _interopRequireDefault(require("lodash"));

var _questions = require("../models/questions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router(); // Post /api/v1/questions
// eslint-disable-next-line consistent-return


router.post('/', function (req, res) {
  var body = _lodash.default.pick(req.body, 'createdBy', 'createdOn', 'meetup', 'title', 'body'); // Validation if all properties are given


  if (!body.createdOn.trim() || !body.meetup || !body.createdBy || !body.title.trim() || !body.body.trim()) {
    return res.status(400).json({
      status: 400,
      error: 'all indicated field should be filled'
    });
  } else if (!_lodash.default.isString(body.title) || !_lodash.default.isString(body.body) || !_lodash.default.isNumber(body.createdBy) || !_lodash.default.isNumber(body.meetup) || !_lodash.default.isString(body.createdOn)) {
    return res.status(415).json({
      status: 415,
      error: 'value types are not correct'
    });
  }

  res.status(201).json({
    status: 201,
    data: (0, _questions.addQuestion)(body)
  });
}); // Patch /api/v1/questions/:id/upvote

router.patch('/:id/upvote', function (req, res) {
  var questionId = parseInt(req.params.id, 10);
  var patchedQuestion = (0, _questions.increaseVote)(questionId);

  if (patchedQuestion) {
    console.log(patchedQuestion);
    res.status(200).json({
      status: 200,
      data: patchedQuestion
    });
  } else {
    res.status(400).json({
      status: 400,
      error: 'no question with specified id'
    });
  }
}); // Patch /api/v1/questions/:id/downvote

router.patch('/:id/downvote', function (req, res) {
  var questionId = parseInt(req.params.id, 10);
  var patchedQuestion = (0, _questions.decreaseVote)(questionId);

  if (patchedQuestion) {
    console.log(patchedQuestion);
    res.status(200).json({
      status: 200,
      data: patchedQuestion
    });
  } else {
    res.status(400).json({
      status: 400,
      error: 'no question with specified id'
    });
  }
});
var _default = router;
exports.default = _default;