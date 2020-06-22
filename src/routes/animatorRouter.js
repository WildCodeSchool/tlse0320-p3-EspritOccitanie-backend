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
const router = express.Router();


router.use(express.json());
router.use(
    express.urlencoded({
        extended: true,
    })
);


router.post('/', AnimatorController.postAnimator);
// router.get('/', animatorController.getAllAnimator);
// router.get('/:id', animatorController.getOneAnimator);
// router.delete('/:id', animatorController.delAnimator);
// router.put('/:id', animatorController.putAnimator);

module.exports = router;









