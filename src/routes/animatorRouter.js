/* eslint-disable indent */

const express = require('express');
const { AnimatorController } = require('../../controllers/animatorController');

const router = express.Router({ mergeParams: true });
const { checkAnimatorForm } = require('../../controllers/validations/animatorValidation');


router.use(express.json());
router.use(
    express.urlencoded({
        extended: true,
    }),
);


router.post('/', checkAnimatorForm, AnimatorController.error, AnimatorController.postAnimator);
router.get('/', AnimatorController.getAllAnimator);
router.put('/:id', AnimatorController.putAnimator);
router.delete('/:id', AnimatorController.delAnimator);
// router.get('/:id', AnimatorController.getOneAnimator);


module.exports = router;
