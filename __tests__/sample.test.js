/* eslint-disable no-undef */


// users routes tests
const request = require('supertest');
const app = require('../src/server');

describe('return all users', () => {
  it('return all users', async (done) => {
    request(app)
      .get('/users')
      .expect(200)
      .end((err) => {
        app.close();
        if (err) return done(err);
        return done();
      });
  });
});

describe('GET users/:id', () => {
  it('returns correct user with a given id', async (done) => {
    request(app)
      .get('/users/2')
      .expect(200, {
        status: 'success',
        results: {
          user_id: 2,
          first_name: 'Georges',
          last_name: 'Abitbol',
          email: 'georges@laclasse.org',
          avatar: 'https://pbs.twimg.com/profile_images/2575754823/image_400x400.jpg',
        },
      })
      .end((err) => {
        app.close();
        if (err) return done(err);
        return done();
      });
  });

  it('returns a 404 with error', async (done) => {
    request(app)
      .get('/users/45')
      .expect(404, {
        status: 'error',
        errorMessage: 'Not found',
      })
      .end((err) => {
        app.close();
        if (err) return done(err);
        return done();
      });
  });
});

describe('POST /users', () => {
  it('returns 201 with inserted data', async (done) => {
    request(app)
      .post('/users')
      .send({
        first_name: 'Cookie',
        last_name: 'Monster',
        email: 'cookie@nom.com',
        avatar: 'https://i.ytimg.com/vi/9rrfjtm7RGE/maxresdefault.jpg',
      })
      .expect(201, {
        status: 'success',
        userCreated: {
          user_id: 3,
          first_name: 'Cookie',
          last_name: 'Monster',
          email: 'cookie@nom.com',
          avatar: 'https://i.ytimg.com/vi/9rrfjtm7RGE/maxresdefault.jpg',
        },
      })
      .end((err) => {
        app.close();
        if (err) return done(err);
        return done();
      });
  });
});
