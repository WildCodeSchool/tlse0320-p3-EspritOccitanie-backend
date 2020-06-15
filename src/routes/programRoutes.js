const express = require('express');

const router = express.Router();
const connection = require('../../db');

router.use(express.json());
router.use(
  express.urlencoded({
    extended: true,
  }),
);

router.get('/create', (req, res) => {
  res.json({ message: 'Hello World!' });
});

module.exports = router;
