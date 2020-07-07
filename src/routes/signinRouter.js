/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const express = require('express');
const bcrypt = require('bcrypt');
const util = require('util');
const connection = require('../../db');

const queryAsync = util.promisify(connection.query).bind(connection);

const router = express.Router({ mergeParams: true });

router.post('/', async (req, res) => {
  const { admin_user, admin_email, admin_password } = req.body;
  try {
    const result = await queryAsync('SELECT * FROM ro_admin WHERE admin_email = ?', admin_email);
    if (!result[0]) {
      const hash = bcrypt.hashSync(admin_password, 10);
      const insert = await queryAsync('INSERT INTO ro_admin SET ?', {
        ...req.body,
        admin_password: hash,
      });
      res.status(201).json({
        id: insert.insertId,
        ...req.body,
      });
    } else {
      res.status(409).send('User already exists');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('something bad happened');
  }
});

module.exports = router;
