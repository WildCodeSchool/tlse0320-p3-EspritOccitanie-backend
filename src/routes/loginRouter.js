/* eslint-disable no-console */
/* eslint-disable camelcase */
const express = require('express');
const bcrypt = require('bcrypt');
const util = require('util');
const connection = require('../../db');

const queryAsync = util.promisify(connection.query).bind(connection);

const router = express.Router({ mergeParams: true });

router.post('', async (req, res) => {
  const { admin_email, admin_password } = req.body;
  console.log('ICI', req.body);
  try {
    const result = await queryAsync('SELECT * FROM ro_admin WHERE admin_email = ?', admin_email);
    const test = bcrypt.compareSync(admin_password, result[0].admin_password); // true
    if (test) {
      res.status(200).json({ message: 'OK' });
    } else {
      res.status(500).send({ message: 'Mot de passe invalide' });
    }
  } catch (err) {
    console.log('catch error', err);
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
