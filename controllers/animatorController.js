/* eslint-disable camelcase */
/* eslint-disable indent */
const { AnimatorModel } = require('../models/animatorModel');

class AnimatorController {
    static postAnimator(req, res) {
        const { animator_firstname, animator_lastname } = req.body;
        try {
            AnimatorModel.postAnimator(req.body, () => {
                if (!animator_firstname || !animator_lastname) {
                    res.status(422).json({ error: 'All fields have to be completed' });
                } else {
                    res.status(200).json(req.body);
                }
            });
        } catch (err) {
            res.status(500).json({ error: 'Something bad happenned' });
        }
    }
}

module.exports = { AnimatorController };





