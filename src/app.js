import express from 'express';
import bodyParser from 'body-parser';

// Import Routes
import indexRouter from './routes/index';
import meetupRouter from './routes/meetup';

const app = express();

// Set to env Port value for availability
const port = process.env.PORT || 3000;

// Using bodyParser to accept JSON and url encoded values
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up all routes
app.use('/api/v1', indexRouter);
app.use('/api/v1/meetups', meetupRouter);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Starting server on port ${port}...`);
});

export default app;
