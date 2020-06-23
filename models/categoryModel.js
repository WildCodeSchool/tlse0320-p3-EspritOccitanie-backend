/* eslint-disable indent */
const connection = require('../db');

class CategoryModel {
  static postCategory(req, callback) {
    connection.query('INSERT INTO ro_category SET ?', [req.body], (err, results) => {
      callback(err, results);
    });
  }
}

module.exports = { CategoryModel };
