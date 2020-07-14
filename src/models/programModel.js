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
        console.log(err);
        callback(err, results);
      },
    );
  }

  static deleteAnimatorProgram(req, ro_program_program_id, callback) {
    connection.query(
      'DELETE FROM ro_animator_has_ro_program WHERE ro_program_program_id = ?',
      ro_program_program_id,
      (err2, results2) => {
        callback(err2, results2);
      },
    );
  }

  static getAllPrograms(req, callback) {
    connection.query(
      `SELECT ro_program.*, ro_category.category_name 
      FROM ro_program
      INNER JOIN ro_category 
      ON ro_program.ro_category_category_id = ro_category.category_id`,
      (err, results) => {
      callback(err, results);
    });
  }

  static getAllProgramsFromAnimator(req, animator, callback) {
    connection.query(
      `SELECT ro_program.*, ro_category.category_name 
      FROM ro_program
      INNER JOIN  ro_animator_has_ro_program
      ON ro_program.program_id = ro_animator_has_ro_program.ro_program_program_id
      INNER JOIN ro_category
      ON ro_program.ro_category_category_id = ro_category.category_id
      WHERE ro_animator_animator_id = ?`,
      [animator], (err, results) => {
      callback(err, results);
    });
  }

  static getAllProgramsFromCategory(req, categorie, callback) {
    connection.query(
      `SELECT ro_program.*, ro_category.category_name 
      FROM ro_program
      INNER JOIN ro_category
      ON ro_program.ro_category_category_id = ro_category.category_id
      WHERE ro_category_category_id = ?`,
    [categorie], (err, results) => {
      callback(err, results);
    });
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
