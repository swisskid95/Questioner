import pool from '../db';

class QuestionController {
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
  static createQuestion(req, res) {
    const {
      createdBy, meetup, title, body,
    } = req.body;

    // Validation that all properties are given
    if (!title || !body || !meetup
      || !createdBy || !title.trim()) {
      return res.status(400).json({
        status: 400,
        error: 'Missing required property',
      });
    } if (typeof title !== 'string' || typeof body !== 'string' || typeof createdBy !== 'number'
      || typeof meetup !== 'number') {
      return res.status(400).json({
        status: 400,
        error: 'value type not correct',
      });
    }

    pool.query('INSERT INTO meetups(createdBy, meetupId, title, body)  VALUES($1, $2, $3, $4) RETURNING *',
      [createdBy, meetup, title, body], (error, response) => {
        if (error) {
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
  static increaseVote(req, res) {
    const questionId = parseInt(req.params.id, 10);
    pool.query(`SELECT * FROM meetups WHERE id = ${questionId}`, (error, response) => {
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
            error: [`meetup with ID: ${questionId} does not exist in record`],
          });
        }
        if (response) {
          res.status(200).json({
            status: 200,
            data: response.rows[0],
          });
        }
      }
    });
  }

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
  static decreaseVote(req, res) {
    const questionId = parseInt(req.params.id, 10);
    pool.query(`SELECT * FROM meetups WHERE id = ${questionId}`, (error, response) => {
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
            error: [`meetup with ID: ${questionId} does not exist in record`],
          });
        }
        if (response) {
          res.status(200).json({
            status: 200,
            data: response.rows[0],
          });
        }
      }
    });
  }
}

export default QuestionController;
