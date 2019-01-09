import express from 'express';

// Import controller class
import MeetupController from '../controller/meetupController';

const router = express.Router();

//  Get api/v1/meetups
router.get('/', MeetupController.getMeetups);

// Get api/v1/meetups/upcoming
router.get('/upcoming', MeetupController.getUpcomingMeetups);

// Get api/v1/meetups/:id
router.get('/:id', MeetupController.getMeetupById);

// Post api/v1/meetups
router.post('/', MeetupController.createMeetup);

// Post api/v1/meetups/:id/rsvp
router.post('/:id/rsvps', MeetupController.addRsvp);

export default router;
