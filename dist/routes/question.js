"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _questionController = _interopRequireDefault(require("../controller/questionController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router(); // Post /api/v1/questions


router.post('/', _questionController.default.createQuestion); // Patch /api/v1/questions/:id/upvote

router.patch('/:id/upvote', _questionController.default.increaseVote); // Patch /api/v1/questions/:id/downvote

router.patch('/:id/downvote', _questionController.default.decreaseVote);
var _default = router;
exports.default = _default;