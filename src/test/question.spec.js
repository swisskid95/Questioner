import chai from 'chai';
import request from 'supertest';
import app from '../app';
import { addQuestion } from '../models/questions';

const { expect } = chai;

describe('Questions Endpoints test', () => {
  it('Test case for get meetups api call', () => {
    // HTTP get request for /api/v1/meetups
    request(app)
      .post('/api/v1/questions')
      .set('accept', 'aplication/json')
      .expect('content/type', /json/)
      .expect(201);
  });

  // it('Test case for get meetups by id api call', () => {
  //   // HTTP get request for /api/v1/meetups
  //   request(app)
  //     .get('/api/v1/meetups/1')
  //     .set('accept', 'aplication/json')
  //     .expect('content/type', /json/)
  //     .expect(200);
  // });

  // it('Test case for post meetups api call', () => {
  //   // HTTP post request for /api/v1/meetups
  //   request(app)
  //     .post('/api/vi/meetups')
  //     .set('accept', 'aplication/json')
  //     .expect('content/type', /json/)
  //     .expect(201);
  // });
});
