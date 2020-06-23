/* eslint-disable camelcase */
/* eslint-disable indent */
const { validationResult } = require('express-validator');
const { AnimatorModel } = require('../models/animatorModel');

class AnimatorController {
    static error(req, res, next) {
        const errorsAnimatorValidation = validationResult(req);

        if (!errorsAnimatorValidation.isEmpty()) {
            // console.log(errorsAnimatorValidation);
            if (errorsAnimatorValidation.errors.find((error) => error.msg === 'value undefined')) {
                return res.status(500).json({ error: 'value undefined' });
            }
            if (
                errorsAnimatorValidation.errors.find((error) => error.msg === 'empty or blank caracteres')
            ) {
                return res.status(500).json({ error: 'empty or blank caracteres' });
            }
            if (errorsAnimatorValidation.errors.find((error) => error.msg === 'is integer')) {
                return res.status(500).json({ error: 'is integer' });
            }
            if (errorsAnimatorValidation.errors.find((error) => error.msg === 'is not email')) {
                return res.status(500).json({ error: 'is not email' });
            }
        }
        return next();
    }

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

    static getAllAnimator(req, res) {
        AnimatorModel.getAllAnimator(req, (err, results) => {
            if (err) {
                return res.status(500).json({ error: `${err}` });
            }
            return res
                .status(200)
                .json(results);
        });
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
