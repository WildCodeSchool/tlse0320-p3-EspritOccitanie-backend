/* eslint-disable no-undef */

const request = require('supertest');
const app = require('../src/server');
const connection = require('../db');

describe('Test routes podcast', () => {
  const expectPodcast = {
    podcast_title: 'Podcat1',
    podcast_duration: '50min',
    podcast_description: 'Super podcast',
    podcast_image: null,
    podcast_mp3: 'podacast.mp3',
    podcast_creation_date: '2017-08-08 10:00:00',
    ro_category_category_id: 1,
  };
  const valueCategorie = { category_name: 'ecologie' };

  beforeEach((done) => {
    connection.query('SET FOREIGN_KEY_CHECKS = 0', () => {
      connection.query('TRUNCATE ro_podcast', () => {
        connection.query('TRUNCATE ro_planning_has_ro_podcast', () => {
          connection.query('TRUNCATE ro_category', () => {
            connection.query('INSERT INTO ro_category SET ?', [valueCategorie], () => {
              connection.query('INSERT INTO ro_podcast SET ?', expectPodcast, done);
            });
          });
        });
      });
    });
  });

  it('GET /podcast - OK', (done) => {
    request(app)
      .get('/podcast')
      .expect(200)
      .end((err) => {
        app.close();
        if (err) return done(err);
        return done();
      });
  });

  it('GET / podcast by id - error', (done) => {
    request(app)
      .get('/podcast/20')
      .expect(404, { error: 'Podcast not exist' })
      .expect('Content-Type', /json/, done);
  });

  it('GET/ podcast by id - OK', (done) => {
    request(app)
      .get('/podcast/1')
      .expect(200, {
        podcast_id: 1,
        podcast_title: 'Podcat1',
        podcast_duration: '50min',
        podcast_description: 'Super podcast',
        podcast_image: null,
        podcast_mp3: 'podacast.mp3',
        podcast_creation_date: '2017-08-08T08:00:00.000Z',
        ro_category_category_id: 1,
      })
      .expect('Content-Type', /json/, done);
  });

  it('DELETE/ podcast by id - OK', (done) => {
    request(app).delete('/podcast/1').expect('Content-Type', /json/).expect(200, done);
  });

  it('UPDATE/ podcast by id - error', (done) => {
    request(app)
      .put('/podcast/1')
      .send({
        podcast_title: '',
        podcast_description: 'Modif description podcast',
        podcast_mp3: '',
      })
      .expect('Content-Type', /json/)
      .expect(404, { error: 'Missing field(s) !' }, done);
  });

  it('UPDATE/ podcast by id - OK', (done) => {
    request(app)
      .put('/podcast/1')
      .send({
        podcast_title: 'Podcatmodif',
        podcast_duration: '40min',
        podcast_description: 'modif',
        podcast_image: null,
        podcast_mp3: 'podacast.mp3',
        podcast_creation_date: null,
        ro_category_category_id: 1,
      })
      .expect('Content-Type', /json/)
      .then((response) => {
        const expected = {
          podcast_id: 1,
          podcast_title: 'Podcatmodif',
          podcast_duration: '40min',
          podcast_description: 'modif',
          podcast_image: null,
          podcast_mp3: 'podacast.mp3',
          podcast_creation_date: null,
          ro_category_category_id: 1,
        };
        expect(response.body).toEqual(expected);
        done();
      });
  });

  it('POST / podcast - OK', (done) => {
    request(app)
      .post('/podcast')
      .send({
        podcast_title: 'Podcast2',
        podcast_duration: '40min',
        podcast_description: 'new podcast',
        podcast_image: null,
        podcast_mp3: 'podacast.mp3',
        podcast_creation_date: '2017-08-08 10:00:00',
        ro_category_category_id: 1,
      })
      .set('Accept', 'application/json;odata=verbose')
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        const expected = {
          podcast_id: expect.any(Number),
          podcast_title: 'Podcast2',
          podcast_duration: '40min',
          podcast_description: 'new podcast',
          podcast_image: null,
          podcast_mp3: 'podacast.mp3',
          podcast_creation_date: '2017-08-08T08:00:00.000Z',
          ro_category_category_id: 1,
        };
        expect(response.body).toEqual(expected);
        done();
      });
  });
});
