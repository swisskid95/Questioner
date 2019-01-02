// Import Statement
import chai from 'chai';
import app from '../app';
import request from 'supertest';

const should = chai.should;

describe('Meetups Endpoints test', () => {
  it('Test case for meetups api call', () => {
    // HTTP get request for /api/v1/meetups
    request(app)
      .get('/api/v1/meetups')
      .set('accept', 'aplication/json')
      .expect('content/type', /json/)
      .expect(200);
  })
});