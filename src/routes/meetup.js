import express from 'express';
import _ from 'lodash';
import {getMeetups, addMeetup } from '../models/meetups';

const router = express.Router();

//  Get api/v1/meetups
router.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    data: getMeetups(),
  });
});

// Post api/v1/meetups
router.post('/', (req, res) => {
  const body = _.pick(req.body, 'createdOn', 'location', 'images', 'topic', 'happeningOn');

  if (!body.createdOn.trim() || !body.location.trim() || !body.topic.trim() || !body.images.trim() || !body.happeningOn.trim()) {
    return res.status(400)
      .json({
        status: 400,
        error: "Invalid request!"
      })
  }

  res.status(201).json({
    status: 201,
    body: addMeetup(body),
  });
});

export default router;
