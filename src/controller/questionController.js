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

    // Validation if all properties are given
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

    return res.status(201).json({
      status: 201,
      data: addQuestion({
        createdBy, meetup, title, body,
      }),
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
  }
}

export default QuestionController;
