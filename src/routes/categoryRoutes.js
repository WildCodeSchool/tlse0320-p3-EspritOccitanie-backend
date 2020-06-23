/* eslint-disable camelcase */
const express = require('express');

const router = express.Router();
const connection = require('../../db');

router.use(express.json());
router.use(
  express.urlencoded({
    extended: true,
  }),
);

// GET ALL CATEGORY
router.get('', (req, res) => {
  connection.query('SELECT * FROM ro_category', (err, results) => {
    if (err) {
      return res.status(404).json({ message: 'Bad request !' });
    }
    if (results.length) {
      return res.status(200).json(results);
    }
    return res.status(404).json({ error: 'Category not found' });
  });
});

// GET CATEGORY BY ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM ro_category WHERE category_id = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message, sql: err.sql });
    }
    if (result.length > 0) {
      return res.status(200).json(result[0]);
    }
    return res.status(404).json({ error: 'Category doesnt exist' });
  });
});

// CREATE CATEGORY
router.post('/', (req, res) => {
  const { category_name } = req.body;
  if (!category_name || category_name === undefined || category_name === '') {
    return res.status(422).json({ error: 'Missing field(s) !' });
  }
  return connection.query('INSERT INTO ro_category SET ?', req.body, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message, sql: err.sql });
    }
    return connection.query(
      'SELECT * FROM ro_category WHERE category_id = ?',
      results.insertId,
      (error, records) => {
        if (error) {
          return res.status(500).json({ error: err.message, sql: err.message });
        }
        return res.status(201).json(records[0]);
      },
    );
  });
});

// DELETE A CATEGORY
router.delete('/:id', (req, res) => {
  const idCategory = req.params.id;
  connection.query('DELETE FROM ro_category WHERE category_id = ?', [idCategory], (err, result) => {
    if (err) {
      res.status(500).send({ error: 'Can not delete this category !' });
    }
    return res.status(200).json(result[0]);
  });
});

module.exports = router;
