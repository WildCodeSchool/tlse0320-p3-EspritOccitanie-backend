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
  try {
    const result = await queryAsync('SELECT * FROM ro_admin WHERE admin_email = ?', admin_email);
    const hash = bcrypt.hashSync(admin_password, 10);
    const test = bcrypt.compareSync(result[0].admin_password, hash); // true
    if (test) {
      console.log('redirection');
      res.status(200).json({ message: 'OK' });
    } else {
      res.status(500).send({ message: 'Mot de passe invalide' });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
