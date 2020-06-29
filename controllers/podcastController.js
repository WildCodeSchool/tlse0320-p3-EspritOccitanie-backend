/* eslint-disable camelcase */
/* eslint-disable indent */

const { PodcastModel } = require('../models/podcastModel');

class PodcastController {
    static postPodcast(req, res) {
        PodcastModel.postPodcast(req, (err, results) => {
            if (err) {
                return res.status(500).json({ error: `${err}`, data: 'refq' });
            }

            return res
                .status(200)
                .json({ message: 'OK', dataSend: req.body, affectedRows: results.affectedRows });
        });
    }

    static getAllPodcasts(req, res) {
        PodcastModel.getAllPodcasts(req, (err, results) => {
            if (err) {
                return res.status(500).json({ error: `${err}` });
            }
            return res
                .status(200)
                .json(results);
        });
    }

    static getOnePodcast(req, res) {
        PodcastModel.getOnePodcast(req, (err, results) => {
            if (err) {
                return res.status(500).json({ error: `${err}` });
            }
            return res
                .status(200)
                .json(results[0]);
        });
    }

    static get4LatestPodcasts(req, res) {
        PodcastModel.get4LatestPodcasts(req, (err, results) => {
            if (err) {
                return res.status(500).json({ error: `${err}` });
            }
            return res
                .status(200)
                .json(results);
        });
    }

    static delPodcast(req, res) {
        PodcastModel.delPodcast(req, (err) => {
            if (err) {
                return res.status(500).json({ error: `${err}` });
            }
            return res
                .status(200)
                .json({ message: 'field deleted' });
        });
    }

    static putPodcast(req, res) {
        PodcastModel.putPodcast(req, (err, results) => {
            if (err) {
                return res.status(500).json({ error: `${err}` });
            }
            return res
                .status(200)
                .json(results[0]);
        });
    }
}

module.exports = { PodcastController };
