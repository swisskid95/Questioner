import createTables from './models/createTables';
import dropTables from './models/dropTables';

const createTable = () => {
  createTables.createMeetupTable();
  createTables.createQuestionTable();
  createTables.createRsvpTable();
  createTables.createUserTables();
};

const dropTable = () => {
  dropTables.dropMeetupTable();
  dropTables.dropQuestionTable();
  dropTables.dropRsvpTable();
  dropTables.dropUserTable();
};

dropTable();

createTable();
