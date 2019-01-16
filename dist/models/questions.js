"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var questions = [{
  id: 1,
  createdOn: new Date(),
  createdBy: 1,
  meetup: 1,
  title: 'question 1',
  body: 'Questions body',
  votes: 12
}, {
  id: 2,
  createdOn: new Date(),
  createdBy: 1,
  meetup: 2,
  title: 'question 1',
  body: 'Questions body',
  votes: 16
}, {
  id: 3,
  createdOn: new Date(),
  createdBy: 2,
  meetup: 1,
  title: 'question 1',
  body: 'Questions body',
  votes: 14
}];
var _default = questions; // mport { Pool } from 'pg';
// import dotenv from 'dotenv';
// dotenv.config();
// const pool = new Pool({
//   connectionstring: process.env.DATABASE_URL,
// });
// // Defining Meetup table and column
// // creates meetup table
// const createQuestionTable = () => {
//   const queryText = `CREATE TABLE IF NOT EXITS
//       Question(
//         QuestionID SERIAL PRIMARY KEY,
//         Location TEXT NOT NULL,
//         CreatedQuestionOn TIMESTAMP,
//         MeetupID INT FOREIGN KEY
//       )`;
//   pool.query(queryText)
//     .then((res) => {
//       console.log(res);
//       pool.end();
//     })
//     .catch((err) => {
//       console.log(err);
//       pool.end();
//     });
// };
// const dropMeetupTable = () => {
//   const queryText = 'DROP TABLE IF EXIST Meetup';
//   pool.query(queryText)
//     .then((res) => {
//       console.log(res);
//       pool.end();
//     })
//     .catch((err) => {
//       console.log(err);
//       pool.end();
//     });
// };
// pool.on('remove', () => {
//   console.log('Client removed');
//   process.end();
// });
// export default {
//   createMeetupTable,
//   dropMeetupTable,
//   pool,
// };
// require('make-runnable');

exports.default = _default;