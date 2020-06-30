/* eslint-disable camelcase */
/* eslint-disable indent */

const { PodcastModel } = require('../models/podcastModel');

class PodcastController {
  static addAnimator(req, res) {
    PodcastModel.addAnimator(req, (err, results) => {
      if (err) {
        return res.status(500).json({ error: `${err}`, data: 'refq' });
      }

      return res
        .status(200)
        .json({ message: 'OK', dataSend: req.body, affectedRows: results.affectedRows });
    });
  }

  static postPodcast(req, res) {
    PodcastModel.postPodcast(req, (err, results) => {
      if (err) {
        return res.status(500).json({ error: `${err}`, data: 'refq' });
      }
      req.podcast_id = results.insertId;
      const ro_podcast_podcast_id = req.podcast_id;
      return PodcastModel.addAnimator(req, ro_podcast_podcast_id, (err1, result1) => {
        if (err1) {
          return res.status(500).json({ error: `${err1}`, data: 'refq' });
        }
        return res.status(200).json(result1);
      });
    });
  }

  static getAllPodcasts(req, res) {
    PodcastModel.getAllPodcasts(req, (err, results) => {
      if (err) {
        return res.status(500).json({ error: `${err}` });
      }
      return res.status(200).json(results);
    });
  }

  static getOnePodcast(req, res) {
    PodcastModel.getOnePodcast(req, (err, results) => {
      if (err) {
        return res.status(500).json({ error: `${err}` });
      }
      return res.status(200).json(results[0]);
    });
  }

  static get4LatestPodcasts(req, res) {
    PodcastModel.get4LatestPodcasts(req, (err, results) => {
      if (err) {
        return res.status(500).json({ error: `${err}` });
      }
      return res.status(200).json(results);
    });
  }

  static delPodcast(req, res) {
    PodcastModel.delPodcast(req, (err) => {
      if (err) {
        return res.status(500).json({ error: `${err}` });
      }
      return res.status(200).json({ message: 'field deleted' });
    });
  }

  static putPodcast(req, res) {
    PodcastModel.putPodcast(req, (err) => {
      if (err) {
        return res.status(500).json({ error: `${err}` });
      }
      req.podcast_id = req.params.id;
      const ro_podcast_podcast_id = req.podcast_id;
      return PodcastModel.putAnimator(req, ro_podcast_podcast_id, (err1, result1) => {
        if (err1) {
          return res.status(500).json({ error: `${err1}`, data: 'refq' });
        }
        return res.status(200).json(result1);
      });
    });
  }
}

module.exports = { PodcastController };
