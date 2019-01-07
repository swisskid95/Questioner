const questions = [
  {
    id: 1,
    createdOn: new Date('now'),
    createdBy: 1,
    meetup: 1,
    title: 'question 1',
    body: 'Questions body',
    votes: 12,
  },
  {
    id: 2,
    createdOn: new Date('now'),
    createdBy: 1,
    meetup: 2,
    title: 'question 1',
    body: 'Questions body',
    votes: 16,
  },
  {
    id: 3,
    createdOn: new Date('now'),
    createdBy: 2,
    meetup: 1,
    title: 'question 1',
    body: 'Questions body',
    votes: 14,
  },
];

// Return all questions
const getQuestions = () => questions;

// Return Qestion by indicated Id
const getQuestionId = id => questions.find(m => m.id === id);

// Adds a new question to the questions array
const addQuestion = (question) => {
  const questionToDb = {};
  const nextId = questions.length + 1;

  questionToDb.id = nextId;
  questionToDb.createdOn = new Date(question.createdOn.trim());
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
    return;
  }

  // increase votes by one(1)
  question.votes += 1;

  return [question]
};

const decreaseVote = (id) => {
  // Checks if question with id exist
  const question = getQuestionId(id);

  // Return if question with id doesn't exist
  if (!question) {
    return;
  }

  // reduce votes by one(1) only when greater than zero
  if (question.votes > 0) question.votes -= 1;

  return [question];
};

export {
  getQuestionId, addQuestion, getQuestions, increaseVote, decreaseVote,
};
