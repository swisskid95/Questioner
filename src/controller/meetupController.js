import moment from 'moment';
import pool from '../db';

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
    pool.query('SELECT * FROM meetups', (error, response) => {
      if (error) {
        response.status(500).json({
          status: 500,
          error: [error.message],
        });
      }
      if (response) {
        res.status(200).json({
          status: 200,
          data: response.rows,
        });
      }
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

    pool.query(`SELECT * FROM meetups WHERE id = ${meetupId}`, (error, response) => {
      if (error) {
        return res.status(500).json({
          status: 500,
          error: [error.message],
        });
      }
      if (response) {
        if (!response.rows[0]) {
          return res.status(404).json({
            status: 404,
            error: [`meetup with ID: ${meetupId} does not exist in record`],
          });
        }
        if (response) {
          res.status(200).json({
            status: 200,
            data: response.rows,
          });
        }
      }
    });
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
      location, images, topic, happeningOn,
    } = req.body;

    const parsedDate = Date.parse(new Date(happeningOn));

    // Validating input
    if (parsedDate <= Date.parse(moment()) || !moment(parsedDate).isValid) {
      return res.status(400).json({
        status: 400,
        error: ['HappeningOn can not be less or equal to todays date'],
      });
    }
    if (!location || !topic || !images || !happeningOn) {
      return res.status(400)
        .json({
          status: 400,
          error: 'required properties not given!',
        });
    } if (typeof location !== 'string' || typeof topic !== 'string'
      || typeof happeningOn !== 'string' || typeof images !== 'object') {
      return res.status(400)
        .json({
          status: 400,
          error: 'The Value types not supported',
        });
    }

    pool.query('INSERT INTO meetups(location, happening_on, topic, images)  VALUES($1, $2, $3, $4) RETURNING *',
      [location, happeningOn, topic, images], (error, response) => {
        if (error) {
          if (error.message === `invalid input syntax for type date: "${happeningOn}"`) {
            return res.status(400).json({
              status: 400,
              error: [`happeningOn: ${happeningOn} should follow this date format: "August 3, 2013"`],
            });
          }
          return res.status(500).json({
            status: 500,
            error: [error.message],
          });
        }
        if (response) {
          return res.status(201).json({
            status: 201,
            message: [response.rows[0]],
          });
        }
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
    pool.query('SELECT * FROM meetups WHERE happening_on > NOW()', (error, response) => {
      if (error) {
        res.status(500).json({
          status: 500,
          error: [error.message],
        });
      }
      if (response) {
        res.status(200).json({
          status: 200,
          data: response.rows,
        });
      }
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
    // const rsvp =

    pool.query('INSERT INTO rsvps(meetup_id, user_id, status) VALUES($1, $2, $3) RETURNING *',
      [meetupId, userId, status], (error, response) => {
        if (error) {
          if (error.message === 'insert or update on table "rsvps" violates foreign key constraint "rsvps_user_id_fkey"') {
            return res.status(404).json({
              status: 404,
              error: 'user with specified id cant be found',
            });
          }

          if (error.message === 'insert or update on table "rsvps" violates foreign key constraint "rsvps_meetup_id_fkey"') {
            return res.status(404).json({
              status: 404,
              error: 'Meetup with specified id cant be found',
            });
          }

          return res.status(500).json({
            status: 500,
            error: error.message,
          });
        }
        if (response) {
          return res.status(201).json({
            status: 201,
            data: response.rows,
          });
        }
      });
  }
}

export default MeetupController;
