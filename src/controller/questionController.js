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

    pool.query('INSERT INTO questions(created_by, meetup_id, title, body)  VALUES($1, $2, $3, $4) RETURNING *',
      [createdBy, meetup, title, body], (error, response) => {
        if (error) {
          if (error.message === 'insert or update on table "questions" violates foreign key constraint "questions_meetup_id_fkey"') {
            return res.status(400).json({
              status: 400,
              error: `meetup with id: ${meetup} does not exist`,
            });
          }

          if (error.message === 'insert or update on table "questions" violates foreign key constraint "questions_created_by_fkey"') {
            return res.status(400).json({
              status: 404,
              error: `user id: ${createdBy} does not exist`,
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
    pool.query(`UPDATE questions SET votes = votes + 1 WHERE id = ${questionId} RETURNING questions.*`, (error, response) => {
      if (error) {
        return res.status(500).json({
          status: 500,
          error: error.message,
        });
      }

      if (response.rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: `Question with id: ${questionId} does not exist`,
        });
      }

      if (response) {
        res.status(200).json({
          status: 200,
          data: response,
        });
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
    pool.query(`SELECT * FROM questions WHERE id = ${questionId}`, (error, response) => {
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
            error: [`Question with ID: ${questionId} does not exist in record`],
          });
        }
      }

      pool.query(`UPDATE questions SET votes = votes - 1 WHERE id = ${questionId} 
        AND votes > 0 RETURNING questions.*`, (fault, message) => {
        if (fault) {
          return res.status(500).json({
            status: 500,
            error: [fault.message],
          });
        }
        if (message) {
          if (!message.rows[0]) {
            return res.status(400).json({
              status: 400,
              error: 'Not allowed to reduce votes below 0',
            });
          }
          if (message) {
            res.status(200).json({
              status: 200,
              data: message.rows,
            });
          }
        }
      });
    });
  }
}

export default QuestionController;
