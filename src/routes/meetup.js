import express from 'express';
import _ from 'lodash';
import {
  getMeetups, addMeetup, getMeetupId, addMeetupToRsvp,
} from '../models/meetups';

const router = express.Router();

//  Get api/v1/meetups
router.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    data: getMeetups(),
  });
});

// Get api/v1/meetups/upcoming
// router.get('/upcoming', (req, res) => {

// })

// Get api/v1/meetups/:id
router.get('/:id', (req, res) => {
  const meetupId = parseInt(req.params.id, 10);
  const matchedMeetup = getMeetupId(meetupId);

  if (matchedMeetup) {
    res.status(200).json({
      status: 200,
      data: matchedMeetup,
    });
  } else {
    res.status(400).json({
      status: 400,
      error: `meetup with id: ${meetupId} does not exist in record`,
    });
  }
});

// Post api/v1/meetups
router.post('/', (req, res) => {
  // selecting only needed properties
  const body = _.pick(req.body, 'createdOn', 'location', 'images', 'topic', 'happeningOn');

  // Validating input
  if (!body.createdOn.trim() || !body.location.trim() || !body.topic.trim()
   || !body.images || !body.happeningOn.trim()) {
    return res.status(400)
      .json({
        status: 400,
        error: 'Invalid request!',
      });
  }

  // All things being equal
  return res.status(201).json({
    status: 201,
    body: addMeetup(body),
  });
});

// Post api/v1/meetups/:id/rsvp
router.post('/:id/rsvps', (req, res) => {
  const body = _.pick(req.body, 'status', 'userId');
  const meetupId = parseInt(req.params.id, 10);

  // Validating input
  if (!body.status || !body.userId) {
    return res.status(400).json({
      status: 400,
      error: 'Required property not given',
    });
  } if (!_.isInteger(body.userId) || !_.isString(body.status)) {
    return res.status(400).json({
      status: 400,
      error: 'value type not correct',
    });
  }

  // fetch specified meetup id and add to RSVP
  const rsvp = addMeetupToRsvp(meetupId, body);

  // check if meetup with id exists
  if (!rsvp) {
    return res.status(404).json({
      status: 404,
      error: 'meetup with the specified ID not found',
    });
  }

  // All condition met
  return res.status(200).json({
    status: 200,
    data: rsvp,
  });
});

export default router;
