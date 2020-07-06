/* eslint-disable indent */
/* eslint-disable camelcase */

const connection = require('../../db');

class ProgramModel {
  static postProgram(req, callback) {
    const {
      program_title,
      program_description,
      program_image,
      ro_category_category_id,
    } = req.body;
    const dataProgram = {
      program_title,
      program_description,
      program_image,
      ro_category_category_id,
    };
    connection.query('INSERT INTO ro_program SET ?', [dataProgram], (err, results) => {
      callback(err, results);
    });
  }

  static addAnimator(req, ro_program_program_id, callback) {
    const { ro_animator_animator_id } = req.body;
    const multiAnimator = [];
    ro_animator_animator_id.map((animatorId) => multiAnimator
      .push([ro_program_program_id, animatorId]));
    connection.query(
      'INSERT INTO ro_animator_has_ro_program (ro_program_program_id, ro_animator_animator_id) VALUES ?',
      [multiAnimator],
      (err1, result1) => {
        callback(err1, result1);
      },
    );
  }

  static putAnimator(req, ro_program_program_id, callback) {
    const { ro_animator_animator_id } = req.body;
    const programAnimator = {
      ro_program_program_id,
      ro_animator_animator_id,
    };
    connection.query(
      'INSERT INTO ro_animator_has_ro_program SET ?',
      [programAnimator],
      (err1, result1) => {
        callback(err1, result1);
      },
    );
  }

  static getAllPrograms(req, callback) {
    connection.query('SELECT * FROM ro_program', (err, results) => {
      callback(err, results);
    });
  }

  static getAllProgramsFromAnimator(req, animator, callback) {
    connection.query('SELECT ro_program_program_id FROM ro_animator_has_ro_program WHERE ro_animator_animator_id = ?', [animator], (err, results) => {
      callback(err, results);
    });
  }

  static getAllProgramsFromCategory(req, categorie, callback) {
    connection.query('SELECT * FROM ro_program WHERE ro_category_category_id = ?', [categorie], (err, results) => {
      callback(err, results);
    });
  }

  static putProgram(req, callback) {
    const {
      program_title,
      program_description,
      program_image,
      ro_category_category_id,
    } = req.body;
    const dataProgram = {
      program_title,
      program_description,
      program_image,
      ro_category_category_id,
    };
    connection.query(
      'UPDATE ro_program SET ? WHERE program_id = ?',
      [dataProgram, req.params.id],
      (err, results) => {
        callback(err, results);
      },
    );
  }

  static delProgram(req, callback) {
    connection.query(
      'DELETE FROM ro_program WHERE program_id = ?',
      req.params.id,
      (err, results) => {
        callback(err, results);
      },
    );
  }

  static getOneProgram(req, cb) {
    connection.query('SELECT * FROM ro_program WHERE program_id = ?', req.params.id, (err, results, fields) => {
      cb(err, results, fields);
    });
  }
}

module.exports = { ProgramModel };
