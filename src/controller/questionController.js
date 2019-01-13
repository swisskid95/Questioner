import questions from '../models/questions';

// Helper functions for question
// Return Qestion by indicated Id
const getQuestionId = id => questions.find(m => m.id === id);

// Adds a new question to the questions array
const addQuestion = (question) => {
  const questionToDb = {};
  const nextId = questions.length + 1;

  questionToDb.id = nextId;
  questionToDb.createdOn = new Date();
  questionToDb.createdBy = question.createdBy;
  questionToDb.meetup = question.meetup;
  questionToDb.title = question.title.trim();
  questionToDb.body = question.body.trim();
  questionToDb.votes = 0;

  // Push data to meetup
  questions.push(questionToDb);

  return [questionToDb];
};

const increaseVote = (id) => {
  // Check if id exist
  const question = getQuestionId(id);

  // Returns if id doesn't exist
  if (!question) {
    return null;
  }

  // increase votes by one(1)
  question.votes += 1;

  return [question];
};

const decreaseVote = (id) => {
  // Checks if question with id exist
  const question = getQuestionId(id);

  // Return if question with id doesn't exist
  if (!question) {
    return null;
  }

  // reduce votes by one(1) only when greater than zero
  if (question.votes > 0) question.votes -= 1;

  return [question];
};

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
