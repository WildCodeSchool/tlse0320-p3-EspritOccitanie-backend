// const animatorRouter = require('express').Router({ mergeParams: true });
// const animatorController = require('../../controllers/animatorController');

// animatorRouter.post('/', animatorController.postAnimator);
// animatorRouter.get('/', animatorController.getAllAnimator);
// animatorRouter.get('/:id', animatorController.getOneAnimator);
// animatorRouter.delete('/:id', animatorController.delAnimator);
// animatorRouter.put('/:id', animatorController.putAnimator);

// module.exports = animatorRouter;


const { AnimatorController } = require('../../controllers/animatorController');
const express = require('express');
const router = express.Router({ mergeParams: true });


router.use(express.json());
router.use(
    express.urlencoded({
        extended: true,
    })
);


router.post('/', AnimatorController.postAnimator);
router.get('/', AnimatorController.getAllAnimator);
router.put('/:id', AnimatorController.putAnimator);
router.delete('/:id', AnimatorController.delAnimator);
// router.get('/:id', AnimatorController.getOneAnimator);


module.exports = router;
