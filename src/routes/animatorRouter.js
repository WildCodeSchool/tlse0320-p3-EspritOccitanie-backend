const animatorRouter = require('express').Router({ mergeParams: true });
const animatorController = require('../../controllers/animatorController');

animatorRouter.post('/', animatorController.postAnimator);
animatorRouter.get('/', animatorController.getAllAnimator);
animatorRouter.get('/:id', animatorController.getOneAnimator);
animatorRouter.delete('/:id', animatorController.delAnimator);
animatorRouter.put('/:id', animatorController.putAnimator);

module.exports = animatorRouter;
