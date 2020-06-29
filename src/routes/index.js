const routes = require('express').Router();

const animatorRouter = require('./animatorRouter');
const categoryRouter = require('./categoryRouter');
const podcastRouter = require('./podcastRouter');

routes.use('/animator', animatorRouter);
routes.use('/category', categoryRouter);
routes.use('/podcast', podcastRouter);

module.exports = routes;
