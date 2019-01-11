/* eslint-disable no-undef */
// Import Statement
import chai from 'chai';
import request from 'supertest';
import app from '../app';

const { expect } = chai;

describe('Meetups Endpoints test', () => {
  it('Test case for api call get all meetups  api/v1/meetups', (done) => {
    request(app)
      .get('/api/v1/meetups')
      .set('accept', 'aplication/json')
      .then((res) => {
        expect(res.status).equal(200);
        expect(res.body.data.length).to.be.greaterThan(0);
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0].id).equal(1);
      });
    done();
  });

  it('Test case for api call get all upcomming to endpoint api/v1/meetups/upcomming', (done) => {
    request(app)
      .get('/api/v1/meetups/upcoming')
      .set('accept', 'aplication/json')
      .then((res) => {
        expect(res.status).equal(200);
        expect(Date.parse(res.body.data[0].happeningOn)).to.be.greaterThan(Date.parse(new Date()));
        expect(res.body.data.length).to.be.greaterThan(0);
        expect(res.body.data).to.be.an('array');
      });
    done();
  });

  it('Test case for api call get by id to endpoint api/v1/meetups/1', (done) => {
    request(app)
      .get('/api/v1/meetups/1')
      .set('accept', 'aplication/json')
      .then((res) => {
        expect(res.status).equal(200);
        expect(res.body.data[0].id).to.equal(1);
        expect(res.body.data.length).to.be.greaterThan(0);
        expect(res.body.data).to.be.an('array');
      });
    done();
  });

  it('Test case for api endpoint api/v1/meetups', (done) => {
    const payload = {
      createdOn: 'June 19, 2018',
      location: '15, Allwhite avenue, Ikotun, Lagos.',
      images: ['http://img1.com', 'http://img2.com', 'http://img3.com'],
      topic: 'meetup 2',
      happeningOn: 'October 1, 2018',
    };
    request(app)
      .post('/api/v1/meetups')
      .send(payload)
      .then((res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.be.an('array');
      });
    done();
  });

  it('Test case for api call: post by meetupid to endpoint api/v1/meetups/1/rsvps', (done) => {
    const payload = {
      userId: 2,
      status: 'yes',
    };
    request(app)
      .post('/api/v1/meetups/1/rsvps')
      .send(payload)
      .then((res) => {
        expect(res.body.data[0].user).to.equal(payload.userId);
        expect(res.status).to.equal(201);
      });
    done();
  });
});

describe('Meetups Endpoints error handling test', () => {
  it('Test case for endpoint api/v1/meetups/<meetup> error handling', (done) => {
    request(app)
      .get('/api/v1/meetups/5')
      .set('accept', 'aplication/json')
      .then((res) => {
        expect(res.status).equal(404);
        expect(res.body.status).to.equal(res.status);
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.equal('meetup with id: 5 does not exist in record');
      });
    done();
  });

  it('1st Test case for api endpoint api/v1/meetups handling error', (done) => {
    const payload = {
      location: '15, Allwhite avenue, Ikotun, Lagos.',
      images: ['http://img1.com', 'http://img2.com', 'http://img3.com'],
      topic: 'meetup 2',
    };
    request(app)
      .post('/api/v1/meetups')
      .send(payload)
      .then((res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.equal('required properties not given!');
        expect(res.body.status).to.equal(res.status);
      });
    done();
  });

  it('2nd Test case for api endpoint api/v1/meetups handling error', (done) => {
    const payload = {
      location: '15, Allwhite avenue, Ikotun, Lagos.',
      images: ['http://img1.com', 'http://img2.com', 'http://img3.com'],
      topic: 'meetup 2',
      happeningOn: 487,
    };
    request(app)
      .post('/api/v1/meetups')
      .send(payload)
      .then((res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.equal('The Value types not supported');
        expect(res.body.status).to.equal(res.status);
      });
    done();
  });

  it('Test case post request to endpoint api/v1/meetups/1/rsvps error handling', (done) => {
    const payload = {
      userId: 2,
      status: 'yes',
    };
    request(app)
      .post('/api/v1/meetups/99/rsvps')
      .send(payload)
      .then((res) => {
        expect(res.body.error).to.equal('meetup with the specified ID not found');
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(res.status);
      });
    done();
  });

  it('Test case 2nd post request to endpoint api/v1/meetups/1/rsvps error handling', (done) => {
    const payload = {
      userId: 2,
      status: true,
    };
    request(app)
      .post('/api/v1/meetups/1/rsvps')
      .send(payload)
      .then((res) => {
        expect(res.body.error).to.equal('value type not correct');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(res.status);
        expect(res.body.error).to.be.a('string');
      });
    done();
  });

  it('Test case 3rd post request to endpoint api/v1/meetups/1/rsvps error handling', (done) => {
    const payload = {
      userId: 2,
    };
    request(app)
      .post('/api/v1/meetups/1/rsvps')
      .send(payload)
      .then((res) => {
        expect(res.body.error).to.equal('Required property not given');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(res.status);
        expect(res.body.error).to.be.a('string');
      });
    done();
  });
});
