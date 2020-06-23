/* eslint-disable camelcase */
/* eslint-disable indent */

const { CategoryModel } = require('../models/categoryModel');

class CategoryController {
  static postCategory(req, res) {
    CategoryModel.postCategory(req, (err, results) => {
      if (err) {
        return res.status(500).json({ error: `${err}`, data: 'refq' });
      }

      return res
        .status(200)
        .json({ message: 'OK', dataSend: req.body, affectedRows: results.affectedRows });
    });
  }
}

module.exports = { CategoryController };
