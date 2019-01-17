import pool from '../db';

class createTables {
  /**
   *Runs the query to create table for meetups
   *
   * @static createMeetupTable
   * @memberof createTables
   */
  static createMeetupTable() {
    const queryText = `CREATE TABLE IF NOT EXISTS meetups(
      id SERIAL PRIMARY KEY,
      location TEXT NOT NULL,
      created_on DATE DEFAULT NOW(),
      happening_on DATE NOT NULL,
      topic TEXT NOT NULL,
      images text[]
    )`;

    pool.query(queryText)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /**
   *Runs the query to create table in database for question
   *
   * @static createQuestionTable
   * @memberof createTables
   */
  static createQuestionTable() {
    const queryText = `CREATE TABLE IF NOT EXISTS questions(
      id SERIAL PRIMARY KEY,
      created_on DATE DEFAULT NOW(),
      created_by INT REFERENCES users(id) NOT NULL,
      meetup_id INT REFERENCES meetups(id) NOT NULL,
      title TEXT NOT NULL,
      body TEXT NOT NULL,
      votes INTEGER DEFAULT 0
      )`;

    pool.query(queryText)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /**
   *Runs the query to create table for Rsvp
   *
   * @static createRsvpTable
   * @memberof createTables
   */
  static createRsvpTable() {
    const queryText = `CREATE TABLE IF NOT EXISTS rsvps(
        id SERIAL PRIMARY KEY,
        meetup_id INT REFERENCES meetups(id) NOT NULL,
        user_id INT REFERENCES users(id) NOT NULL,
        response TEXT NOT NULL
      )`;

    pool.query(queryText)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  /**
   *Runs the query to create table for User
   *
   * @static createUserTable
   *
   * @memberof createTables
   */
  static createUserTables() {
    const queryText = `CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        other_name TEXT,
        username TEXT UNIQUE NOT NULL,
        email TEXT NOT NULL,
        phone_number TEXT NOT NULL,
        registered DATE DEFAULT NOW(),
        topic TEXT NOT NULL,
        is_admin BOOLEAN DEFAULT FALSE
      )`;

    pool.query(queryText)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        pool.end();
      });
  }
}

export default createTables;
