/* eslint-disable no-undef */
//
// users routes tests
const request = require('supertest');
const app = require('../src/server');

describe('POST - program', () => {
  it('GET / sends "Hello World" as json', async (done) => {
    request(app)
      .get('/program/create')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        const expected = { message: 'Hello World!' };
        expect(response.body).toEqual(expected);
        done();
      });
  });
});


