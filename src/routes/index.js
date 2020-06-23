const routes = require('express').Router();

const animatorRouter = require('./animatorRouter');
const categoryRouter = require('./categoryRouter');

routes.use('/animator', animatorRouter);
routes.use('/category', categoryRouter);

module.exports = routes;
