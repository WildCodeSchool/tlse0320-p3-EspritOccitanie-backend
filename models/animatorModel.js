/* eslint-disable indent */
const connection = require('../db');

class AnimatorModel {
    static postAnimator(req, callback) {
        connection.query('INSERT INTO ro_animator SET ?', [req.body], (err, results) => {
            callback(err, results);
        });
    }

    static getAllAnimator(req, callback) {
        connection.query('SELECT * FROM ro_animator', (err, results) => {
            callback(err, results);
        });
    }

    static putAnimator(req, callback) {
        connection.query('UPDATE ro_animator SET ? WHERE animator_id = ?', [req.body, req.params.id], (err, results) => {
            callback(err, results);
        });
    }

    static delAnimator(req, callback) {
        connection.query('DELETE FROM ro_animator WHERE animator_id = ?', req.params.id, (err, results) => {
            callback(err, results);
        });
    }

    static getOneAnimator(req, callback) {
        connection.query(
            'SELECT * FROM ro_animator WHERE animator_id = ?',
            req.params.id,
            (err, results) => {
                callback(err, results);
            },
        );
    }
}

module.exports = { AnimatorModel };
