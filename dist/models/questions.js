"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decreaseVote = exports.increaseVote = exports.getQuestions = exports.addQuestion = exports.getQuestionId = void 0;
var questions = [{
  id: 1,
  createdOn: new Date('now'),
  createdBy: 1,
  meetup: 1,
  title: 'question 1',
  body: 'Questions body',
  votes: 12
}, {
  id: 2,
  createdOn: new Date('now'),
  createdBy: 1,
  meetup: 2,
  title: 'question 1',
  body: 'Questions body',
  votes: 16
}, {
  id: 3,
  createdOn: new Date('now'),
  createdBy: 2,
  meetup: 1,
  title: 'question 1',
  body: 'Questions body',
  votes: 14
}]; // Return all questions

var getQuestions = function getQuestions() {
  return questions;
}; // Return Qestion by indicated Id


exports.getQuestions = getQuestions;

var getQuestionId = function getQuestionId(id) {
  return questions.find(function (m) {
    return m.id === id;
  });
}; // Adds a new question to the questions array


exports.getQuestionId = getQuestionId;

var addQuestion = function addQuestion(question) {
  var questionToDb = {};
  var nextId = questions.length + 1;
  questionToDb.id = nextId;
  questionToDb.createdOn = new Date(question.createdOn.trim());
  questionToDb.createdBy = question.createdBy;
  questionToDb.meetup = question.meetup;
  questionToDb.title = question.title.trim();
  questionToDb.body = question.body.trim();
  questionToDb.votes = 0; // Push data to meetup

  questions.push(questionToDb);
  return [questionToDb];
};

exports.addQuestion = addQuestion;

var increaseVote = function increaseVote(id) {
  // Check if id exist
  var question = getQuestionId(id); // Returns if id doesn't exist

  if (!question) {
    return;
  } // increase votes by one(1)


  question.votes += 1;
  return [question];
};

exports.increaseVote = increaseVote;

var decreaseVote = function decreaseVote(id) {
  // Checks if question with id exist
  var question = getQuestionId(id); // Return if question with id doesn't exist

  if (!question) {
    return;
  } // reduce votes by one(1) only when greater than zero


  if (question.votes > 0) question.votes -= 1;
  return [question];
};

exports.decreaseVote = decreaseVote;