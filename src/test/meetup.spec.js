/* eslint-disable no-undef */
// Import Statement
import chai from 'chai';
import request from 'supertest';
import app from '../app';
import { getMeetups, addMeetup } from '../models/meetups';

const { expect } = chai;

describe('Model functions for interacting with fake db', () => {
  it('Test case for function getMeetup', () => {
    // Test getmetup return value type
    expect(getMeetups()).be.a('array');
  });

  it('Test case for addMeetup', () => {
    expect(addMeetup({
      createdOn: 'June 19, 2018',
      location: '15, Allwhite avenue, Ikotun, Lagos.',
      images: ['http://img1.com', 'http://img2.com', 'http://img3.com'],
      topic: 'meetup 2',
      happeningOn: 'October 1, 2018',
    })).be.lengthOf(1);
  });
});

describe('Meetups Endpoints test', () => {
  it('Test case for get meetups api call', () => {
    // HTTP get request for /api/v1/meetups
    request(app)
      .get('/api/v1/meetups')
      .set('accept', 'aplication/json')
      .expect('content/type', /json/)
      .expect(200);
  });

  it('Test case for get meetups api call', () => {
    // HTTP get request for /api/v1/meetups
    request(app)
      .get('/api/v1/meetups.upcoming')
      .set('accept', 'aplication/json')
      .expect('content/type', /json/)
      .expect(200);
  });

  it('Test case for get meetups by id api call', () => {
    // HTTP get request for /api/v1/meetups/:<meetupID>
    request(app)
      .get('/api/v1/meetups/1')
      .set('accept', 'aplication/json')
      .expect('content/type', /json/)
      .expect(200);
  });

  it('Test case for post meetups api call', () => {
    // HTTP post request for /api/v1/meetups
    request(app)
      .post('/api/vi/meetups')
      .set('accept', 'aplication/json')
      .expect('content/type', /json/)
      .expect(201);
  });

  // it('Test case for post meetup by id to RSVP', () => {
  //   // HTTP post request for api/v1/meetups/:<meetupID>/rsvp
  //   request(app)
  //     .post('/api/v1/meetups/1/rsvp',)
  // })
});
