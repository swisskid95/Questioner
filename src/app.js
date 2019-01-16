import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
// import dotenv from 'dotenv';

// Import Routes
import indexRouter from './routes/index';
import meetupRouter from './routes/meetup';
import questionRouter from './routes/question';

// dotenv.config();

const app = express();

app.use(logger('dev'));

// Set to env Port value for availability
const port = process.env.PORT || 3000;

// Using bodyParser to accept JSON and url encoded values
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up all routes
app.use('/api/v1', indexRouter);
app.use('/api/v1/meetups', meetupRouter);
app.use('/api/v1/questions', questionRouter);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Starting server on port ${port}...`);
});

export default app;
