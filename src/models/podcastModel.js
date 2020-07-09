/* eslint-disable indent */
/* eslint-disable camelcase */

const connection = require('../../db');

class PodcastModel {
  static addAnimator(req, ro_podcast_podcast_id, callback) {
    const { ro_animator_animator_id } = req.body;
    const multiAnimator = [];
    ro_animator_animator_id.map((animatorId) =>
      multiAnimator.push([ro_podcast_podcast_id, animatorId]),
    );
    connection.query(
      'INSERT INTO ro_podcast_has_ro_animator(ro_podcast_podcast_id, ro_animator_animator_id) VALUES ?',
      [multiAnimator],
      (err1, result1) => {
        callback(err1, result1);
      },
    );
  }

  static deleteAnimatorPodcast(req, ro_podcast_podcast_id, callback) {
    connection.query(
      'DELETE FROM ro_podcast_has_ro_animator WHERE ro_podcast_podcast_id = ?',
      ro_podcast_podcast_id,
      (err2, results2) => {
        callback(err2, results2);
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

  static getOnePodcast(req, cb) {
    connection.query(
      'SELECT * FROM ro_podcast WHERE podcast_id = ?',
      req.params.id,
      (err, results, fields) => {
        cb(err, results, fields);
      },
    );
  }

  static getPodcastFromProgram(req, program, callback) {
    connection.query(
      'SELECT * FROM ro_podcast WHERE ro_program_program_id = ?',
      [program],
      (err, results) => {
        callback(err, results);
      },
    );
  }

  static getPodcastFromAnimator(req, animator, callback) {
    connection.query(
      'SELECT ro_podcast_podcast_id FROM ro_podcast_has_ro_animator WHERE ro_animator_animator_id = ?',
      [animator],
      (err, results) => {
        callback(err, results);
      },
    );
  }

  static getPodcastWithCategorie(req, categorie, callback) {
    connection.query(
      'SELECT * FROM ro_podcast WHERE ro_category_category_id = ?',
      [categorie],
      (err, results) => {
        callback(err, results);
      },
    );
  }
}

module.exports = { PodcastModel };
