/* eslint-disable indent */
/* eslint-disable camelcase */

const connection = require('../db');

class PodcastModel {
  static addAnimator(req, ro_podcast_podcast_id, callback) {
    const { ro_animator_animator_id } = req.body;
    const multiAnimator = [];
    ro_animator_animator_id.map((animatorId) => multiAnimator
    .push([ro_podcast_podcast_id, animatorId]));
      connection.query('INSERT INTO ro_podcast_has_ro_animator(ro_podcast_podcast_id, ro_animator_animator_id) VALUES ?',
      [multiAnimator], (err1, result1) => {
        callback(err1, result1);
      });
  }

  static putAnimator(req, ro_podcast_podcast_id, callback) {
    const { ro_animator_animator_id } = req.body;
    const podcastAnimator = {
        ro_animator_animator_id,
        ro_podcast_podcast_id,
      };
    connection.query(
      'INSERT INTO ro_podcast_has_ro_animator SET ?',
      [podcastAnimator],
      (err1, result1) => {
        callback(err1, result1);
      },
    );
  }

  static postPodcast(req, callback) {
    const {
      podcast_title,
      podcast_duration,
      podcast_description,
      podcast_image,
      podcast_mp3,
      podcast_creation_date,
      ro_category_category_id,
      ro_program_program_id,
      ro_animator_animator_id,
    } = req.body;
    const dataPodcast = {
      podcast_title,
      podcast_duration,
      podcast_description,
      podcast_image,
      podcast_mp3,
      podcast_creation_date,
      ro_category_category_id,
      ro_program_program_id,
    };
    console.log(ro_animator_animator_id);
    connection.query('INSERT INTO ro_podcast SET ?', [dataPodcast], (err, results) => {
      callback(err, results);
    });
  }

  static getAllPodcasts(req, callback) {
    connection.query('SELECT * FROM ro_podcast', (err, results) => {
      callback(err, results);
    });
  }

  static get4LatestPodcasts(req, callback) {
    connection.query(
      'SELECT *, DATE_FORMAT(podcast_creation_date, "%d/%m/%Y") FROM ro_podcast order by podcast_creation_date desc limit 4',
      (err, results) => {
        callback(err, results);
      },
    );
  }

  static putPodcast(req, callback) {
      const podcast_id = req.params.id;
    const {
        podcast_title,
        podcast_duration,
        podcast_description,
        podcast_image,
        podcast_mp3,
        podcast_creation_date,
        ro_category_category_id,
        ro_program_program_id,
        ro_animator_animator_id,
      } = req.body;
      const dataPodcast = {
        podcast_title,
        podcast_duration,
        podcast_description,
        podcast_image,
        podcast_mp3,
        podcast_creation_date,
        ro_category_category_id,
        ro_program_program_id,
      };
    connection.query(
      'UPDATE ro_podcast SET ? WHERE podcast_id = ?',
      [dataPodcast, podcast_id],
      (err, results) => {
        callback(err, results);
      },
    );
  }

  static delPodcast(req, callback) {
    connection.query(
      'DELETE FROM ro_podcast WHERE podcast_id = ?',
      req.params.id,
      (err, results) => {
        callback(err, results);
      },
    );
  }

  static getOnePodcast(id, cb) {
    connection.query('SELECT * FROM ro_podcast WHERE id = ?', id, (err, results, fields) => {
      cb(err, results, fields);
    });
  }
}

module.exports = { PodcastModel };
