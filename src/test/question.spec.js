/* eslint-disable no-undef */
import chai from 'chai';
import request from 'supertest';
import app from '../app';

const { expect } = chai;

describe('Questions Endpoints test', () => {
  it('Test case to post a new question to record call', (done) => {
    const payload = {
      createdOn: 'january 5, 2019',
      createdBy: 2,
      meetup: 2,
      title: 'titlesd',
      body: 'it is nice',
    };
    request(app)
      .post('/api/v1/questions')
      .send(payload)
      .set('accept', 'aplication/json')
      .then((res) => {
        expect('content/type', /json/);
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal(res.status);
        expect(res.body.data).to.be.an('array');
        done();
      });
  });

  it('Test case for patch questions by id api call', (done) => {
    request(app)
      .patch('/api/v1/questions/1/upvote')
      .set('accept', 'aplication/json')
      .then((res) => {
        expect('content/type', /json/);
        expect(res.status).to.equal(200);
        expect(res.body.data).to.be.an('array');
        expect(res.body.status).to.equal(res.status);
        done();
      });
  });

  it('Test case for patch questions by id api call', (done) => {
    request(app)
      .patch('/api/v1/questions/1/downvote')
      .set('accept', 'aplication/json')
      .then((res) => {
        expect('content/type', /json/);
        expect(res.status).to.equal(200);
        expect(res.body.data).to.be.an('array');
        expect(res.body.status).to.equal(res.status);
      });
    done();
  });
});

describe('Error handling on questions Endpoints', () => {
  it('Test case for question', (done) => {
    request(app)
      .patch('/api/v1/questions/99/upvote')
      .set('accept', 'aplication/json')
      .then((res) => {
        expect('content/type', /json/);
        expect(res.status).to.equal(400);
        expect(res.body.error).to.be.a('string');
        expect(res.body.status).to.equal(res.status);
        expect(res.body.error).to.equal('no question with specified id');
      });
    done();
  });

  it('Test case for missing property', (done) => {
    const payload = {
      createdBy: 2,
      meetup: 2,
      title: 'titlesd',
    };
    request(app)
      .post('/api/v1/questions')
      .send(payload)
      .set('accept', 'aplication/json')
      .then((res) => {
        expect('content/type', /json/);
        expect(res.status).to.equal(400);
        expect(res.body.error).to.be.a('string');
        expect(res.body.status).to.equal(res.status);
        expect(res.body.error).to.equal('Missing required property');
      });
    done();
  });

  it('Test case for invalid value type', (done) => {
    const payload = {
      createdBy: 2,
      meetup: 2,
      title: 'titlesd',
      body: 4,
    };
    request(app)
      .post('/api/v1/questions')
      .send(payload)
      .set('accept', 'aplication/json')
      .then((res) => {
        expect('content/type', /json/);
        expect(res.status).to.equal(400);
        expect(res.body.error).to.be.a('string');
        expect(res.body.status).to.equal(res.status);
        expect(res.body.error).to.equal('value type not correct');
      });
    done();
  });

  it('Test case for question id not found downvote', (done) => {
    request(app)
      .patch('/api/v1/questions/99/downvote')
      .set('accept', 'aplication/json')
      .then((res) => {
        expect('content/type', /json/);
        expect(res.status).to.equal(400);
        expect(res.body.error).to.be.a('string');
        expect(res.body.status).to.equal(res.status);
      });
    done();
  });
});
