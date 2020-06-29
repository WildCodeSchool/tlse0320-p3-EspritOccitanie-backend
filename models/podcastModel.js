/* eslint-disable indent */
const connection = require('../db');

class PodcastModel {
    static postPodcast(req, callback) {
        connection.query('INSERT INTO ro_podcast SET ?', [req.body], (err, results) => {
            callback(err, results);
        });
    }

    static getAllPodcasts(req, callback) {
        connection.query('SELECT * FROM ro_podcast', (err, results) => {
            callback(err, results);
        });
    }

    static get4LatestPodcasts(req, callback) {
        connection.query('SELECT *, DATE_FORMAT(podcast_creation_date, "%d/%m/%Y") FROM ro_podcast order by podcast_creation_date desc limit 4', (err, results) => {
            callback(err, results);
        });
    }

    static putPodcast(req, callback) {
        connection.query('UPDATE ro_podcast SET ? WHERE podcast_id = ?', [req.body, req.params.id], (err, results) => {
            callback(err, results);
        });
    }

    static delPodcast(req, callback) {
        connection.query('DELETE FROM ro_podcast WHERE podcast_id = ?', req.params.id, (err, results) => {
            callback(err, results);
        });
    }

    static getOnePodcast(id, cb) {
        connection.query(
            'SELECT * FROM ro_podcast WHERE id = ?',
            id,
            (err, results, fields) => {
                cb(err, results, fields);
            },
        );
    }
}

module.exports = { PodcastModel };
