const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || (process.env.NODE_ENV === 'test' ? 3001 : 3000);
const connection = require('../db');

app.use(express.json());
app.use(cors());

app.get('/animators', (req, res) => {
  connection.query("SELECT * FROM ro_animator", (err, results) => {
    console.log(results)
    if (err) {
      res.status(404).json({ message: 'bad request !' })
    } else {
      if (results.length) {
        res.status(200).json(results[0]);
      } else {
        res.status(404).json({ error: "Animator not found" });
      }
    }
  });
})

const server = app.listen(PORT, () => {
  console.log(`🌍 Server is running on port ${PORT}`);
});

module.exports = server;

