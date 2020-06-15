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
    console.log(results);
    if (err) {
      res.status(404).json({ message: 'bad request !' });
    } else {
      if (results.length) {
        res.status(200).json(results);
      } else {
        res.status(404).json({ error: 'Animator not found' });
      }
    }
  });
});

router.post('/', (req, res) => {
  const { animator_firstname, animator_lastname, animator_description, animator_image } = req.body;
  if (!animator_firstname || !animator_lastname) {
    return res.status(422).json({ error: 'required field(s) missing' });
  }
  connection.query('INSERT INTO ro_animator SET ?', req.body, (err, results) => {
    console.log(results);
    if (err) {
      console.log(err);
      return res.status(500).json({ error: err.message, sql: err.sql });
    }

    connection.query(
      'SELECT * FROM ro_animator WHERE animator_id = ?',
      results.insertId,
      (err, records) => {
        if (err) {
          console.log(err);
          console.log(results);
          console.log(records);
          return res.status(500).json({ error: err.message, sql: err.message });
        } else {
          return res.status(201).json(records[0]);
        }
      }
    );
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM ro_animator WHERE animator_id = ?', [id], (err, result) => {
    console.log(result);
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message, sql: err.sql });
    } else {
      if (result.length > 0) {
        console.log('testresult=', result.length);
        return res.status(200).json(result[0]);
      } else {
        return res.status(404).json({ error: 'Animator not in DB' });
      }
    }
  });
});

router.put('/:id/update', (req, res) => {
  const id = req.params.id;
  const { animator_firstname, animator_lastname } = req.body;
  if (!animator_firstname || !animator_lastname) {
    res.status(404).json({ error: 'Missing firstname or lastname !' });
  }
  connection.query('UPDATE ro_animateur SET ? WHERE animator_id = ?', [req.body, id], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Animator not update' });
    }
    connection.query('SELECT * FROM ro_animator WHERE animator_id = ?', [id], (err, records) => {
      if (err) {
        return res.status(500).json({ error: err.message, sql: err.message });
      } else {
        return res.status(200).json(records[0]);
      }
    });
  });
});
/* router.delete('/:id/delete', (req, res) => {
  const idUser = req.params.id;
  const { animator_firstname, animator_lastname } = req.body;

  connection.query('DELETE ro_animateur SET ? WHERE animator_id = ?', [req.body, idUser], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Animator not delete' });
    }
    connection.query('SELECT * FROM ro_animator WHERE animator_id = ?', [idUser], (err, records) => {
      if (err) {
        return res.status(500).json({ error: err.message, sql: err.message });
      } else {
        return res.sendstatus(200);
      }
    });
  });
}); */


module.exports = router;
