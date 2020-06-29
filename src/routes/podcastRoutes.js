/* eslint-disable camelcase */
const express = require('express');

const router = express.Router();
// const connection = require('../../db');

router.use(express.json());
router.use(
  express.urlencoded({
    extended: true,
  }),
);

// GET ALL PODCASTS
// router.get('/', (req, res) => {
//   connection.query('SELECT * FROM ro_podcast', (err, results) => {
//     if (err) {
//       return res.status(404).json({ message: 'Bad request !' });
//     }
//     if (results.length) {
//       return res.status(200).json(results);
//     }
//     return res.status(404).json({ error: 'Podcast not found' });
//   });
// });

// GET ALL PODCASTS by date DESC
/* router.get('/date', (req, res) => {
  connection.query
  ('SELECT *, DATE_FORMAT(podcast_creation_date, "%d/%m/%Y")
  FROM ro_podcast order by podcast_creation_date desc limit 4', (err, results) => {
    if (err) {
      return res.status(404).json({ message: 'Bad request !' });
    }
    if (results.length) {
      return res.status(200).json(results);
    }
    return res.status(404).json({ error: 'Podcast not found' });
  });
}); */

// GET PODCAST BY ID
// router.get('/:id', (req, res) => {
//   const { id } = req.params;
//   connection.query('SELECT * FROM ro_podcast WHERE podcast_id = ?', [id], (err, result) => {
//     if (err) {
//       return res.status(500).json({ error: err.message, sql: err.sql });
//     }
//     if (result.length > 0) {
//       return res.status(200).json(result[0]);
//     }
//     return res.status(404).json({ error: 'Podcast not exist' });
//   });
// });

// UPDATE PODCAST BY ID
// router.put('/:id', (req, res) => {
//   const { id } = req.params;
//   const { podcast_title, podcast_description, podcast_mp3 } = req.body;
//   if (!podcast_title || !podcast_description || !podcast_mp3) {
//     return res.status(404).json({ error: 'Missing field(s) !' });
//   }
//   return connection.query
// ('UPDATE ro_podcast SET ? WHERE podcast_id = ?', [req.body, id], (err) => {
//     if (err) {
//       return res.status(500).json({ error: 'Podcast not update' });
//     }
//     return connection.query
// ('SELECT * FROM ro_podcast WHERE podcast_id = ?', [id], (err2, records) => {
//       if (err2) {
//         return res.status(500).json({ error: 'Bad request !' });
//       }
//       return res.status(200).json(records[0]);
//     });
//   });
// });

// CREATE A PODCAST
/* router.post('/', (req, res) => {
  const {
    podcast_title,
    podcast_mp3,
    ro_category_category_id,
    podcast_creation_date,
  } = req.body;

  try {
    if (!podcast_title || !podcast_mp3 || !ro_category_category_id || !podcast_creation_date) {
      return res.status(422).json({ error: 'Missing field(s) !' });
    }
    return connection.query('INSERT INTO ro_podcast SET ?', req.body, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message, sql: err.sql });
      }
      return connection.query(
        'SELECT * FROM ro_podcast WHERE podcast_id = ?',
        results.insertId,
        (err2, records) => {
          if (err2) {
            return res.status(500).json({ error: err2.message, sql: err.message });
          }
          return res.status(201).json(records[0]);
        },
      );
    });
  } catch (e) {
    return e(e);
  }
}); */

// DELETE PODCAST BY ID
// router.delete('/:id', (req, res) => {
//   const idPodcast = req.params.id;
//   connection.query('DELETE FROM ro_podcast WHERE podcast_id = ?', [idPodcast], (err, result) => {
//     if (err) {
//       res.status(500).send({ error: 'Can not delete this podcast !' });
//     }
//     return res.status(200).json(result[0]);
//   });
// });
module.exports = router;
