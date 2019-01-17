import pool from '../db';

// Defining Meetup table and column
// creates meetup table
class dropTables {
  /**
   *Drops Table for easy clear
   *
   * @static dropQuestionTable
   *
   * @memberof dropTables
   */
  static dropQuestionTable() {
    const queryText = 'DROP TABLE IF EXISTS questions';

    pool.query(queryText)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static dropMeetupTable() {
    const queryText = 'DROP TABLE IF EXISTS meetups';

    pool.query(queryText)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static dropRsvpTable() {
    const queryText = 'DROP TABLE IF EXISTS rsvps';

    pool.query(queryText)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static dropUserTable() {
    const queryText = 'DROP TABLE EXISTS users';

    pool.query(queryText)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default dropTables;
