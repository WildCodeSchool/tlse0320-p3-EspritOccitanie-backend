const routes = require('express').Router();
const animatorRouter = require('./animatorRouter');
const categoryRouter = require('./categoryRouter');
const podcastRouter = require('./podcastRouter');
const programRouter = require('./programRouter');
const signinRouter = require('./signinRouter');
const loginRouter = require('./loginRouter');

routes.use('/animator', animatorRouter);
routes.use('/category', categoryRouter);
routes.use('/podcast', podcastRouter);
routes.use('/program', programRouter);
routes.use('/signin', signinRouter);
routes.use('/login', loginRouter);

module.exports = routes;
