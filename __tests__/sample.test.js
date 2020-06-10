/* eslint-disable no-undef */


// users routes tests
const request = require('supertest');
const app = require('../src/server');

describe('should return status 200 and check object in response', () => {
  const expectedResult = {
    animator_id: 1,
    animator_firstname: 'Roger',
    animator_lastname: 'Labbit',
    animator_description: 'Aime danser',
    animator_image: null
  }

  it('returns status 200', async (done) => {
    request(app)
      .get('/animators')
      .expect(200, expectedResult)
      .end((err) => {
        app.close();
        if (err) return done(err);
        return done();
      })
  })
})