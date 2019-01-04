import express from 'express';
import _ from 'lodash';
import { addQuestion } from '../models/questions';

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
  }else if (!_.isString(body.title) || !_.isString(body.body) || !_.isNumber(body.createdBy) || !_.isNumber(body.meetup) || !_.isString(body.createdOn)) {
    return res.status(400).json({
      status: 400,
      error: 'value types are not correct',
    });
  }

  res.status(201).json({
    status: 201,
    data: addQuestion(body),
  });
});

export default router;
