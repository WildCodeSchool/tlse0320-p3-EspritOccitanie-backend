/* eslint-disable indent */
const connection = require('../db');

class AnimatorModel {
    static postAnimator(datas, cb) {
        connection.query(
            'INSERT INTO ro_animator SET ?',
            datas,
            (err, results, fields) => {
                cb(err, results, fields);
            },
        );
    }

    static getOneAnimator(id, cb) {
        connection.query(
            'SELECT * FROM ro_animator WHERE id = ?',
            id,
            (err, results, fields) => {
                cb(err, results, fields);
            },
        );
    }

    static getAllAnimator(cb) {
        connection.query('SELECT * FROM ro_animator', (err, results, fields) => {
            cb(err, results, fields);
        });
    }

    static delAnimator(id, cb) {
        connection.query(
            'DELETE FROM ro_animator WHERE id = ?',
            id,
            (err, results, fields) => {
                cb(err, results, fields);
            },
        );
    }

    static putAnimator(id, datas, cb) {
        connection.query(
            'UPDATE ro_animator SET ? WHERE id = ?',
            [datas, id],
            (err, results, fields) => {
                cb(err, results, fields);
            },
        );
    }
}

module.exports = AnimatorModel;
