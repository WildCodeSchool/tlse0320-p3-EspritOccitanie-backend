/* eslint-disable camelcase */
/* eslint-disable indent */

const { AnimatorModel } = require('../models/animatorModel');

class AnimatorController {
    static postAnimator(req, res) {
        AnimatorModel.postAnimator(req, (err, results) => {
            if (err) {
                return res.status(500).json({ error: `${err}`, data: 'refq' });
            }

            return res
                .status(200)
                .json({ message: 'OK', dataSend: req.body, affectedRows: results.affectedRows });
        });
    }

    static getOneAnimator(req, res) {
        AnimatorModel.getOneAnimator(req, (err, results) => {
            if (err) {
                return res.status(404).json({ error: err.message, sql: err.sql });
            }

            return res
                .status(200)
                .json(results[0]);
        });
    }

    static getAllAnimator(req, res) {
        const { program, podcast } = req.query;
        if (program) {
            AnimatorModel.getAllAnimatorFromProgram(req, program, (err, results) => {
                if (err) {
                    return res.status(500).json({ error: `${err}` });
                }
                return res.status(200).json(results);
            });
        }
        if (podcast) {
            AnimatorModel.getAllAnimatorFromPodcast(req, podcast, (err, results) => {
                if (err) {
                    return res.status(500).json({ error: `${err}` });
                }
                return res.status(200).json(results);
            });
        } else {
            AnimatorModel.getAllAnimator(req, (err, results) => {
                if (err) {
                    return res.status(500).json({ error: `${err}` });
                }
                return res
                    .status(200)
                    .json(results);
            });
        }
    }

    static delAnimator(req, res) {
        AnimatorModel.delAnimator(req, (err, results) => {
            if (err) {
                return res.status(500).json({ error: `${err}` });
            }
            return res
                .status(200)
                .json(results);
        });
    }

    static putAnimator(req, res) {
        AnimatorModel.putAnimator(req, (err, results) => {
            if (err) {
                return res.status(500).json({ error: `${err}` });
            }
            return res
                .status(200)
                .json(results);
        });
    }
}

module.exports = { AnimatorController };
