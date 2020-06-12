const express = require('express');

const router = express.Router();
const connection = require('../../db');

router.use(express.json());
router.use(
  express.urlencoded({
    extended: true,
  })
);

router.post('/create', (req, res) => {
  connection.query('INSERT INTO ro_program SET ?', req.body, (error, result) => {
    if (error) {
      return console.log(error);
    }

    return connection.query(
      'SELECT * FROM ro_program WHERE program_id=?',
      result.insertId,
      (err, records) => {
        if (err) {
          console.log(err);
        }

        return res.status(200).json(records[0]);
      }
    );
  });
});

module.exports = router;
