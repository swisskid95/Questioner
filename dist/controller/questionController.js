"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _questions = _interopRequireDefault(require("../models/questions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Helper functions for question
// Return Qestion by indicated Id
var getQuestionId = function getQuestionId(id) {
  return _questions.default.find(function (m) {
    return m.id === id;
  });
}; // Adds a new question to the questions array


var addQuestion = function addQuestion(question) {
  var questionToDb = {};
  var nextId = _questions.default.length + 1;
  questionToDb.id = nextId;
  questionToDb.createdOn = new Date(question.createdOn.trim());
  questionToDb.createdBy = question.createdBy;
  questionToDb.meetup = question.meetup;
  questionToDb.title = question.title.trim();
  questionToDb.body = question.body.trim();
  questionToDb.votes = 0; // Push data to meetup

  _questions.default.push(questionToDb);

  return [questionToDb];
};

var _increaseVote = function increaseVote(id) {
  // Check if id exist
  var question = getQuestionId(id); // Returns if id doesn't exist

  if (!question) {
    return;
  } // increase votes by one(1)


  question.votes += 1;
  return [question];
};

var _decreaseVote = function decreaseVote(id) {
  // Checks if question with id exist
  var question = getQuestionId(id); // Return if question with id doesn't exist

  if (!question) {
    return;
  } // reduce votes by one(1) only when greater than zero


  if (question.votes > 0) question.votes -= 1;
  return [question];
};

var QuestionController =
/*#__PURE__*/
function () {
  function QuestionController() {
    _classCallCheck(this, QuestionController);
  }

  _createClass(QuestionController, null, [{
    key: "createQuestion",

    /**
     * handles post to endpoint api/v1/questions
     * Creates new question and adds to question
     *
     * @static createQuestion
     *
     * @param {object} req
     * @param {object} res
     *
     * @memberof QuestionController
     */
    value: function createQuestion(req, res) {
      var _req$body = req.body,
          createdBy = _req$body.createdBy,
          createdOn = _req$body.createdOn,
          meetup = _req$body.meetup,
          title = _req$body.title,
          body = _req$body.body; // Validation if all properties are given

      if (!createdOn || !title || !body || !createdOn.trim() || !meetup || !createdBy || !title.trim()) {
        return res.status(400).json({
          status: 400,
          error: 'Missing required property'
        });
      }

      if (typeof title !== 'string' || typeof body !== 'string' || typeof createdBy !== 'number' || typeof meetup !== 'number' || typeof createdOn !== 'string') {
        return res.status(400).json({
          status: 400,
          error: 'value type not correct'
        });
      }

      return res.status(201).json({
        status: 201,
        data: addQuestion({
          createdBy: createdBy,
          createdOn: createdOn,
          meetup: meetup,
          title: title,
          body: body
        })
      });
    }
    /**
    * handles patch to api/v1/questions/:id/upvote
    * increases the vote by one once request is succesful
    *
    * @static increaseVote
    *
    * @param {object} req
    * @param {object} res
    *
    * @memberof QuestionController
    */

  }, {
    key: "increaseVote",
    value: function increaseVote(req, res) {
      var questionId = parseInt(req.params.id, 10);

      var patchedQuestion = _increaseVote(questionId);

      if (patchedQuestion) {
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
    }
    /**
     * Consumes endpoint api/v1/questions/<questionId/downvotes
     * Decreases votes on a specified question Id
     *
     * @static decreaseVote
     *
     * @param {*} req
     * @param {*} res
     *
     * @memberof QuestionController
     */

  }, {
    key: "decreaseVote",
    value: function decreaseVote(req, res) {
      var questionId = parseInt(req.params.id, 10);

      var patchedQuestion = _decreaseVote(questionId);

      if (patchedQuestion) {
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
    }
  }]);

  return QuestionController;
}();

var _default = QuestionController;
exports.default = _default;