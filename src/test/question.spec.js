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

  it('Test case for patch questions by id api call', () => {
    // HTTP patch request for /api/v1/questions/:id/upvote
    request(app)
      .patch('/api/v1/questions/1/upvote')
      .set('accept', 'aplication/json')
      .expect('content/type', /json/)
      .expect(200);
  });

  it('Test case for patch questions by id api call', () => {
    // HTTP patch request for /api/v1/questions/:id/downvote
    request(app)
      .patch('/api/v1/questions/1/downvote')
      .set('accept', 'aplication/json')
      .expect('content/type', /json/)
      .expect(200);
  }); 
});
