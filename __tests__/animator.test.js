/* eslint-disable no-undef */

// users routes tests
const request = require('supertest');
const app = require('../src/server');
const connection = require('../db');

describe('should return status 200 and check object in response', () => {
  const expectedResult = {
    animator_id: 1,
    animator_firstname: 'Roger',
    animator_lastname: 'Labbit',
    animator_description: 'Aime danser',
    animator_image: null,
  };
  beforeEach((done) =>
    connection.query('TRUNCATE ro_animator', () =>
      connection.query('INSERT INTO ro_animator set ?', expectedResult, done)
    )
  );

  it('returns status 200', async (done) => {
    request(app)
      .get('/animators')
      .expect(200, expectedResult)
      .end((err) => {
        app.close();
        if (err) return done(err);
        return done();
      });
  });

  it('POST /animator - error', (done) => {
    request(app)
      .post('/animator')
      .send({})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)
      .end((err) => {
        if (err) {
          return done(err);
        }
        return done();
      });
  });

  it('POST /animator - OK', (done) => {
    request(app)
      .post('/animator')
      .send({
        animator_firstname: 'Monique',
        animator_lastname: 'Name',
        animator_description: 'Animatrice',
        animator_image: null,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        const expected = {
          animator_id: expect.any(Number),
          animator_firstname: 'Monique',
          animator_lastname: 'Name',
          animator_description: 'Animatrice',
          animator_image: null,
        };
        expect(response.body).toEqual(expected);
        done();
      });
  });

  it('GET / animator by id - error', (done) => {
    request(app)
      .get('/animator/20')
      .expect(404, { error: 'Animator not in DB' })
      .expect('Content-Type', /json/, done);
  });

  it('GET / animator by id - OK', (done) => {
    request(app).get('/animator/1').expect(200).expect('Content-Type', /json/, done);
  });

  it('UPDATE/ animator by id - error', (done) => {
    request(app)
      .put('/animator/1/update')
      .send({
        animator_firstname: '',
        animator_lastname: '',
        animator_description: 'Dévelopeur',
        animator_image: '',
      })
      .expect('Content-Type', /json/)
      .expect(404, { error: 'Missing firstname or lastname !' }, done);
  });

  it('UPDATE/ aniamtor by id - OK', (done) => {
    request(app)
      .put('/animator/1/update')
      .send({
        animator_id: 1,
        animator_firstname: 'John',
        animator_lastname: 'Doe',
        animator_description: 'Développeur',
        animator_image: null,
      })
      .expect('Content-Type', /json/)
      .then((response) => {
        const expected = {
          animator_id: 1,
          animator_firstname: 'John',
          animator_lastname: 'Doe',
          animator_description: 'Développeur',
          animator_image: null,
        };
        expect(response.body).toEqual(expected);
        done();
      });
  });
});
