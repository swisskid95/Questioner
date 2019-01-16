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
          meetup = _req$body.meetup,
          title = _req$body.title,
          body = _req$body.body; // Validation if all properties are given

      if (!title || !body || !meetup || !createdBy || !title.trim()) {
        return res.status(400).json({
          status: 400,
          error: 'Missing required property'
        });
      }

      if (typeof title !== 'string' || typeof body !== 'string' || typeof createdBy !== 'number' || typeof meetup !== 'number') {
        return res.status(400).json({
          status: 400,
          error: 'value type not correct'
        });
      }

      return res.status(201).json({
        status: 201,
        data: addQuestion({
          createdBy: createdBy,
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
    value: function (_increaseVote) {
      function increaseVote(_x, _x2) {
        return _increaseVote.apply(this, arguments);
      }

      increaseVote.toString = function () {
        return _increaseVote.toString();
      };

      return increaseVote;
    }(function (req, res) {
      var questionId = parseInt(req.params.id, 10);
      var patchedQuestion = increaseVote(questionId);

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
    })
    /**
     * Consumes endpoint api/v1/questions/<questionId/downvotes
     * Decreases votes on a specified question Id
     *
     * @static decreaseVote
     *
     * @param {object} req
     * @param {object} res
     *
     * @memberof QuestionController
     */

  }, {
    key: "decreaseVote",
    value: function (_decreaseVote) {
      function decreaseVote(_x3, _x4) {
        return _decreaseVote.apply(this, arguments);
      }

      decreaseVote.toString = function () {
        return _decreaseVote.toString();
      };

      return decreaseVote;
    }(function (req, res) {
      var questionId = parseInt(req.params.id, 10);
      var patchedQuestion = decreaseVote(questionId);

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
    })
  }]);

  return QuestionController;
}();

var _default = QuestionController;
exports.default = _default;