import express from 'express';
import _ from 'lodash';
import { addQuestion, increaseVote, decreaseVote } from '../models/questions';

const router = express.Router();

// Post /api/v1/questions
// eslint-disable-next-line consistent-return
router.post('/', (req, res) => {
  const body = _.pick(req.body, 'createdBy', 'createdOn', 'meetup', 'title', 'body');

  // Validation if all properties are given
  if (!body.createdOn.trim() || !body.meetup || !body.createdBy
    || !body.title.trim() || !body.body.trim()) {
    return res.status(400).json({
      status: 400,
      error: 'all indicated field should be filled',
    });
  } if (!_.isString(body.title) || !_.isString(body.body) || !_.isNumber(body.createdBy)
    || !_.isNumber(body.meetup) || !_.isString(body.createdOn)) {
    return res.status(415).json({
      status: 415,
      error: 'value type not correct',
    });
  }

  res.status(201).json({
    status: 201,
    data: addQuestion(body),
  });
});

// Patch /api/v1/questions/:id/upvote
router.patch('/:id/upvote', (req, res) => {
  const questionId = parseInt(req.params.id, 10);
  const patchedQuestion = increaseVote(questionId);

  if (patchedQuestion) {
    res.status(200).json({
      status: 200,
      data: patchedQuestion,
    });
  } else {
    res.status(400).json({
      status: 400,
      error: 'no question with specified id',
    });
  }
});

// Patch /api/v1/questions/:id/downvote
router.patch('/:id/downvote', (req, res) => {
  const questionId = parseInt(req.params.id, 10);
  const patchedQuestion = decreaseVote(questionId);

  if (patchedQuestion) {
    res.status(200).json({
      status: 200,
      data: patchedQuestion,
    });
  } else {
    res.status(400).json({
      status: 400,
      error: 'no question with specified id',
    });
  }
});

export default router;
