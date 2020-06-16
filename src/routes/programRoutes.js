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
  const { program_title, ro_category_category_id } = req.body;

  if (!req.body) {
    return res.statut(400);
  }

  // if (!program_title || !ro_category_category_id) {
  //   return res.statut(400, {error});
  // }

  return connection.query('INSERT INTO ro_program SET ?', req.body, (error, result) => {
    if (error) {
      if (error.errno === 1064) {
        console.log(error);
        return res.status(400).json({ error: 'invalid request', errorMessage: error.errno });
      }

      if (error.errno === 1364) {
        console.log(error);
        return res.status(400).json({
          error: 'ER_NO_DEFAULT_FOR_FIELD',
          errorMessage: error.errno,
        });
      }

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

router.delete('/:id/delete', (req, res) => {
  const { id } = req.params;
  console.log(req.params);
});

module.exports = router;
