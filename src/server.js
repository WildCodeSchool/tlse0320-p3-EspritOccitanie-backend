const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || (process.env.NODE_ENV === 'test' ? 3001 : 3000);
const connection = require('../db');

app.use(express.json());
app.use(cors());

app.get('/users', (req, res) => {
  connection.query('SELECT * from users', (error, results) => {
    res.status(200).json({
      status: 'success',
      results,
    });
  });
});

app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  try {
    connection.query('SELECT * from users WHERE `user_id`= ?', id, (error, results) => {
      if (results.length === 0) {
        res.status(404).json({
          status: 'error',
          errorMessage: 'Not found',
        });
      } else {
        res.status(200).json({
          status: 'success',
          results: results[0],
        });
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      errorMessage: 'Our server encountered an error performing the request',
    });
  }
});

app.post('/users', (req, res) => {
  const { body: formData } = req;
  try {
    const query = 'INSERT INTO users SET ?';
    connection.query(query, formData, (error, results) => {
      res.status(201).json({
        status: 'success',
        userCreated: {
          user_id: results.insertId,
          ...formData,
        },
      });
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      errorMessage: 'Our server encountered an error performing the request',
    });
  }
});
const server = app.listen(PORT, () => {
  console.log(`🌍 Server is running on port ${PORT}`);
});

module.exports = server;
