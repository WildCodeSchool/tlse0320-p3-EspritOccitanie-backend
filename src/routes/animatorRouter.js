/* eslint-disable indent */

const express = require('express');

const router = express.Router({ mergeParams: true });
const { AnimatorController } = require('../../controllers/animatorController');

const { checkAnimatorForm } = require('../../controllers/validations/animatorValidation');
const { Check } = require('../../controllers/checkErrors');

router.use(express.json());
router.use(
    express.urlencoded({
        extended: true,
    }),
);

router.post('/', checkAnimatorForm, Check.error, AnimatorController.postAnimator);
router.get('/', AnimatorController.getAllAnimator);
router.put('/:id', AnimatorController.putAnimator);
router.delete('/:id', AnimatorController.delAnimator);
router.get('/:id', AnimatorController.getOneAnimator);

module.exports = router;
