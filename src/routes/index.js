const routes = require('express').Router();





const animatorRouter = require('./animatorRouter');
/* const programRoutes = require('./routes/programRoutes'); */
routes.use('/animator', animatorRouter);
/* const animatorRoutes = require('./routes/animatorRoutes'); */
/* const podcastRoutes = require('./routes/podcastRoutes'); */

/* app.use('/program', programRoutes); */
/* app.use('/animator', animatorRoutes); */
/* app.use('/podcast', podcastRoutes); */




module.exports = routes;
