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

router.get('/', (req, res) => {
  connection.query('SELECT * FROM ro_animator', (err, results) => {
    if (err) {
      return res.status(404).json({ message: 'bad request !' });
    }
    if (results.length) {
      return res.status(200).json(results);
    }
    return res.status(404).json({ error: 'Animator not found' });
  });
});

router.post('/', (req, res) => {
  const { animator_firstname, animator_lastname } = req.body;
  if (!animator_firstname || !animator_lastname) {
    return res.status(422).json({ error: 'required field(s) missing' });
  }
  return connection.query('INSERT INTO ro_animator SET ?', req.body, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message, sql: err.sql });
    }

    connection.query(
      'SELECT * FROM ro_animator WHERE animator_id = ?',
      results.insertId,
      (err2, records) => {
        if (err2) {
          return res.status(500).json({ error: err.message, sql: err.message });
        }
        return res.status(201).json(records[0]);
      },
    );
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM ro_animator WHERE animator_id = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message, sql: err.sql });
    }
    if (result.length > 0) {
      return res.status(200).json(result[0]);
    }
    return res.status(404).json({ error: 'Animator not in DB' });


  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { animator_firstname, animator_lastname } = req.body;
  if (!animator_firstname || !animator_lastname) {
    return res.status(404).json({ error: 'Missing firstname or lastname !' });
  }
  return connection.query('UPDATE ro_animator SET ? WHERE animator_id = ?', [req.body, id], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Animator not update' });
    }
    connection.query('SELECT * FROM ro_animator WHERE animator_id = ?', [id], (err, records) => {
      if (err) {
        return res.status(500).json({ error: err.message, sql: err.message });
      }
      return res.status(200).json(records[0]);
    });
  });
});

module.exports = router;
