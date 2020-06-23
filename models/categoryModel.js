/* eslint-disable indent */
const connection = require('../db');

class CategoryModel {
  static postCategory(req, callback) {
    connection.query('INSERT INTO ro_category SET ?', [req.body], (err, results) => {
      callback(err, results);
    });
  }

  static getAllCategory(req, callback) {
    connection.query('SELECT * FROM ro_category', (err, results) => {
      callback(err, results);
    });
  }

  static getOneCategory(req, callback) {
    connection.query(
      'SELECT * FROM ro_category WHERE category_id = ?',
      req.params.id,
      (err, results) => {
        callback(err, results);
      },
    );
  }
}

module.exports = { CategoryModel };
