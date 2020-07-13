/* eslint-disable indent */
/* eslint-disable camelcase */

const connection = require('../../db');

class PodcastModel {
  static addAnimator(req, ro_podcast_podcast_id, callback) {
    const { ro_animator_animator_id } = req.body;
    const multiAnimator = [];
    ro_animator_animator_id
      .map((animatorId) => multiAnimator
        .push([ro_podcast_podcast_id, animatorId]));
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
    connection.query(
      `SELECT ro_podcast.*, ro_program.program_title, ro_category.category_name, ro_podcast_has_ro_animator.*, ro_animator.* 
      FROM ro_podcast 
      INNER JOIN ro_program 
      ON ro_podcast.ro_program_program_id = ro_program.program_id 
      INNER JOIN ro_category 
      ON ro_podcast.ro_category_category_id = ro_category.category_id
      INNER JOIN ro_podcast_has_ro_animator
      ON ro_podcast.podcast_id = ro_podcast_has_ro_animator.ro_podcast_podcast_id
      INNER JOIN ro_animator
      ON ro_podcast_has_ro_animator.ro_animator_animator_id = ro_animator.animator_id
      ORDER BY podcast_creation_date DESC`,
    (err, results) => {
      callback(err, results);
    },
);
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
      `SELECT ro_podcast.*, ro_program.program_title, ro_category.category_name, ro_podcast_has_ro_animator.*, ro_animator.* 
      FROM ro_podcast 
      INNER JOIN ro_program 
      ON ro_podcast.ro_program_program_id = ro_program.program_id 
      INNER JOIN ro_category 
      ON ro_podcast.ro_category_category_id = ro_category.category_id
      INNER JOIN ro_podcast_has_ro_animator
      ON ro_podcast.podcast_id = ro_podcast_has_ro_animator.ro_podcast_podcast_id
      INNER JOIN ro_animator
      ON ro_podcast_has_ro_animator.ro_animator_animator_id = ro_animator.animator_id
      WHERE podcast_id = ?`,
      req.params.id,
      (err, results, fields) => {
        cb(err, results, fields);
      },
    );
  }

  static getPodcastFromProgram(req, program, callback) {
    connection.query(
      `SELECT ro_podcast.*, ro_program.program_title, ro_category.category_name 
      FROM ro_podcast 
      INNER JOIN ro_program 
      ON ro_podcast.ro_program_program_id = ro_program.program_id 
      INNER JOIN ro_category ON ro_podcast.ro_category_category_id = ro_category.category_id 
      WHERE ro_program_program_id = ?`,
      [program],
      (err, results) => {
        callback(err, results);
      },
    );
  }

  static getPodcastFromAnimator(req, animator, callback) {
    connection.query(
      `SELECT ro_podcast_podcast_id, ro_podcast.*, ro_program.program_title, ro_category.category_name 
      FROM ro_podcast 
      INNER JOIN ro_podcast_has_ro_animator 
      ON ro_podcast.podcast_id = ro_podcast_has_ro_animator.ro_podcast_podcast_id 
      INNER JOIN ro_category 
      ON ro_podcast.ro_category_category_id = ro_category.category_id 
      INNER JOIN ro_program 
      ON ro_podcast.ro_program_program_id = ro_program.program_id
      WHERE ro_podcast_has_ro_animator.ro_animator_animator_id = ?`,
      [animator],
      (err, results) => {
        callback(err, results);
      },
    );
  }

  static getPodcastWithCategorie(req, categorie, callback) {
    connection.query(
      `SELECT ro_podcast.*, ro_program.program_title, ro_category.category_name 
      FROM ro_podcast 
      INNER JOIN ro_category 
      ON ro_podcast.ro_category_category_id = ro_category.category_id 
      INNER JOIN ro_program 
      ON ro_podcast.ro_program_program_id = ro_program.program_id 
      WHERE ro_podcast.ro_category_category_id = ?`,
      [categorie],
      (err, results) => {
        callback(err, results);
      },
    );
  }
}

module.exports = { PodcastModel };
