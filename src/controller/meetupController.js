import meetups from '../models/meetups';
import rsvps from '../models/rsvp';

// Helper functions
// Returns all meetups
const getMeetups = () => meetups;

// returns a specific meetup with id specified
const getMeetupId = id => meetups.find(m => m.id === id);

// Filters out the meetups below current date
const getUpcomingMeetup = () => {
  const today = Date.parse(new Date());

  const upcomingMeetups = meetups.filter(m => Date.parse(m.happeningOn) > today);

  return upcomingMeetups;
};

// create new meetup
const addMeetup = (meetup) => {
  const meetupToDb = {};
  const nextId = meetups.length + 1;

  meetupToDb.id = nextId;
  meetupToDb.createdOn = new Date(meetup.createdOn.trim());
  meetupToDb.location = meetup.location.trim();
  meetupToDb.images = [...meetup.images];
  meetupToDb.topic = meetup.topic.trim();
  meetupToDb.happeningOn = new Date(meetup.happeningOn.trim());

  // Push data to meetups
  meetups.push(meetupToDb);

  return [meetupToDb];
};

// push meetup with id to rsvp
const addMeetupToRsvp = (id, body) => {
  const meetupToRsvp = {};

  // Check if id exist in meetup
  const meetupId = getMeetupId(id);

  // return Null if id doesn't exist in meetup
  if (!meetupId) {
    return;
  }

  // Generate new id for RSVP
  const nextId = rsvps.length + 1;

  // extract useful property
  meetupToRsvp.id = nextId;
  meetupToRsvp.meetup = meetupId.id;
  meetupToRsvp.user = body.userId;
  meetupToRsvp.status = body.status;

  // push data to RSVPs
  rsvps.push(meetupToRsvp);

  // eslint-disable-next-line consistent-return
  return [meetupToRsvp];
};

class MeetupController {
  /**
   * Handle get for the route api/v1/meetups
   * pools all meetups in the meetup record
   *
   * @static getMeetups
   *
   * @param {object} req
   * @param {object} res
   *
   * @memberof MeetupController
   */
  static getMeetups(req, res) {
    res.status(200).json({
      status: 200,
      data: getMeetups(),
    });
  }

  /**
   * Handle get for the route api/v1/meetups/:id
   * pools meetup from meetup record with specified id
   *
   * @static getMeetupById
   *
   * @param {object} req
   * @param {object} res
   *
   * @memberof MeetupController
   */
  static getMeetupById(req, res) {
    const meetupId = parseInt(req.params.id, 10);
    const matchedMeetup = getMeetupId(meetupId);

    if (matchedMeetup) {
      res.status(200).json({
        status: 200,
        data: [matchedMeetup],
      });
    } else {
      res.status(404).json({
        status: 404,
        error: `meetup with id: ${meetupId} does not exist in record`,
      });
    }
  }

  /**
   * Handle post for the route api/v1/meetups
   * creates new meetup and adds it to meetup record
   *
   * @static createMeetup
   *
   * @param {object} req
   * @param {object} res
   *
   * @memberof MeetupController
   */
  static createMeetup(req, res) {
    // selecting only needed properties
    const {
      createdOn, location, images, topic, happeningOn,
    } = req.body;

    // Validating input
    if (!createdOn || !location || !topic || !images || !happeningOn || !createdOn.trim()
      || !location.trim() || !topic.trim() || !happeningOn.trim()) {
      return res.status(400)
        .json({
          status: 400,
          error: 'Invalid request!',
        });
    }

    return res.status(201).json({
      status: 201,
      data: addMeetup({
        createdOn, location, images, topic, happeningOn,
      }),
    });
  }

  /**
   * Handle get for the route api/v1/meetups/upcoming
   * gets all meetups that are yet to occur from record
   *
   * @static getUpcomingMeetups
   *
   * @param {object} req
   * @param {object} res
   *
   * @memberof MeetupController
   */
  static getUpcomingMeetups(req, res) {
    const upcommingMeetup = getUpcomingMeetup();

    if (!upcommingMeetup) {
      return res.status(200).json({
        status: 200,
        data: ['There are no upcoming meetups'],
      });
    }

    return res.status(200).json({
      status: 200,
      data: upcommingMeetup,
    });
  }

  /**
   * Handle post for the route api/v1/meetups/rsvps
   * updates rsvp list with specified meetup id
   *
   * @static addRsvp
   *
   * @param {object} req
   * @param {object} res
   *
   * @memberof MeetupController
   */
  static addRsvp(req, res) {
    const { userId, status } = req.body;
    const meetupId = parseInt(req.params.id, 10);

    // Validating input
    if (!status || !userId) {
      return res.status(400).json({
        status: 400,
        error: 'Required property not given',
      });
    } if (typeof userId !== 'number' || typeof status !== 'string') {
      return res.status(400).json({
        status: 400,
        error: 'value type not correct',
      });
    }

    // fetch specified meetup id and add to RSVP
    const rsvp = addMeetupToRsvp(meetupId, { status, userId });

    // check if meetup with id exists
    if (!rsvp) {
      return res.status(404).json({
        status: 404,
        error: 'meetup with the specified ID not found',
      });
    }

    // All conditions met
    return res.status(201).json({
      status: 201,
      data: rsvp,
    });
  }
}

export default MeetupController;
