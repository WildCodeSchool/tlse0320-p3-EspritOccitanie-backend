const routes = require('express').Router();

const animatorRouter = require('./animatorRouter');

routes.use('/animator', animatorRouter);

module.exports = routes;
