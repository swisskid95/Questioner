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
        expect(res.body.data[0].id).equal(1);
      })
      .catch((error) => {
        throw error;
      });
    done();
  });

  it('Test case for api call get all upcomming to endpoint api/v1/meetups/upcomming', (done) => {
    request(app)
      .get('/api/v1/meetups/upcoming')
      .set('accept', 'aplication/json')
      .then((res) => {
        expect(res.status).equal(200);
        expect(res.body.data.length).to.be.greaterThan(0);
      })
      .catch((error) => {
        throw error;
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
      })
      .catch((error) => {
        throw error;
      });
    done();
  });


  it('Test case for api endpoint api/v1/meetups', (done) => {
    const payload = {
      createdOn: 'June 19, 2018',
      location: '15, Allwhite avenue, Ikotun, Lagos.',
      images: ['http://img1.com', 'http://img2.com', 'http://img3.com'],
      topic: 'meetup 2',
      happeningOn: 'October 1, 2019',
    };
    request(app)
      .post('/api/v1/meetups')
      .send(payload)
      .then((res) => {
        expect(res.status).to.equal(201);
      })
      .catch((error) => {
        throw error;
      });
    done();
  });
});

describe('Meetups Endpoints error handling test', () => {
  it('Test case for endpoint api/v1/meetups/<meetup> error handling', (done) => {
    request(app)
      .get('/api/v1/meetups/55')
      .set('accept', 'aplication/json')
      .then((res) => {
        expect(res.status).equal(404);
        expect(res.body.status).to.equal(res.status);
      })
      .catch((error) => {
        throw error;
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
        expect(res.body.error).to.equal('required properties not given!');
        expect(res.body.status).to.equal(res.status);
      })
      .catch((error) => {
        throw error;
      });
    done();
  });
});
