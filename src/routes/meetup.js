import express from 'express';
import _ from 'lodash';
import {getMeetups, addMeetup, getMeetupId } from '../models/meetups';

const router = express.Router();

//  Get api/v1/meetups
router.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    data: getMeetups(),
  });
});

// Get api/v1/meetups/:id
router.get('/:id', (req, res) => {
  const meetupId = parseInt(req.params.id, 10);
  const matchedMeetup = getMeetupId(meetupId);

  if(matchedMeetup){
    res.status(200).json({
      status: 200,
      data: matchedMeetup
    });
  }else {
    res.status(400).json({
      status: 400,
      error: `meetup with id: ${meetupId} does not exist in record`
    });
  } 
})

// Post api/v1/meetups
router.post('/', (req, res) => {
  const body = _.pick(req.body, 'createdOn', 'location', 'images', 'topic', 'happeningOn');

  if (!body.createdOn.trim() || !body.location.trim() || !body.topic.trim() || !body.images || !body.happeningOn.trim()) {
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
