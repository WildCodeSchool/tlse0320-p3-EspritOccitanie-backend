const express = require('express');

const router = express.Router();
const connection = require('../../db');

router.use(express.json());
router.use(
  express.urlencoded({
    extended: true,
  })
);

// GET ALL PODCASTS
router.get('/', (req, res) => {
  connection.query('SELECT * FROM ro_podcast', (err, results) => {
    // console.log('result', results);
    if (err) {
      console.log(err);
      return res.status(404).json({ message: 'Bad request !' });
    } else {
      if (results.length) {
        return res.status(200).json(results[0]);
      } else {
        return res.status(404).json({ error: 'Podcast not found' });
      }
    }
  });
});

// GET PODCAST BY ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM ro_podcast WHERE podcast_id = ?', [id], (err, result) => {
    //   console.log('result/id', result);
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message, sql: err.sql });
    } else {
      if (result.length > 0) {
        //   console.log('testresult=', result.length);
        return res.status(200).json(result[0]);
      } else {
        return res.status(404).json({ error: 'Podcast not exist' });
      }
    }
  });
});

// UPDATE PODCAST BY IS ID
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { podcast_title, podcast_description, podcast_mp3 } = req.body;
  if (!podcast_title || !podcast_description || !podcast_mp3) {
    res.status(404).json({ error: 'Missing field(s) !' });
  }
  connection.query('UPDATE ro_podcast SET ? WHERE podcast_id = ?', [req.body, id], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Podcast not update' });
    }
    connection.query('SELECT * FROM ro_podcast WHERE podcast_id = ?', [id], (err, records) => {
      if (err) {
        return res.status(500).json({error: 'Bad request !'});
      } else {
        return res.status(200).json(records[0]);
      }
    });
  });
});

// DELETE PODCAST BY ID
// router.delete('/:id', (req, res) => {
//   const id = req.params.id;
//   connection.query('DELETE FROM ro_podcast WHERE podcast_id = ?', [id], (err, result) => {
//     console.log(id);
//     if (err) {
//       return res.status(404).json({error: 'Bad request !'});
//     } else {
//       if (result) {
//         console.log(result);
//         return res.status(200).json(result[0]);
//       } else {
//         return res.status(404).json({ error: 'Podcast not exist' });
//       }
//     }
//   }); 
// });


router.delete('/:id', (req, res) => {
  const idPodcast = req.params.id;
  connection.query('DELETE FROM ro_podcast WHERE podcast_id = ?', [idPodcast], (err, result) => {
    console.log(idPodcast);
    if (err) {
      res.status(500).send({error: 'Can not delete this podcast !'});
    }
    return res.status(200).json(result[0]);
  }); 
});
module.exports = router;
