const express = require('express');

const router = express.Router();
const connection = require('../../db');

router.use(express.json());
router.use(
  express.urlencoded({
    extended: true,
  }),
);

router.post('/create', (req, res) => {
  if (!req.body) {
    return res.statut(400);
  }

  return connection.query('INSERT INTO ro_program SET ?', req.body, (error, result) => {
    if (error) {
      if (error.errno === 1064) {
        return res.status(400).json({ error: 'invalid request', errorMessage: error.errno });
      }

      if (error.errno === 1364) {
        return res.status(400).json({
          error: 'ER_NO_DEFAULT_FOR_FIELD',
          errorMessage: error.errno,
        });
      }
    }
    return connection.query(
      'SELECT * FROM ro_program WHERE program_id=?',
      result.insertId,
      (err, records) => {
        if (err) {
          return res.status(404);
        }
        return res.status(200).json(records[0]);
      },
    );
  });
});

module.exports = router;
