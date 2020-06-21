const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || (process.env.NODE_ENV === 'test' ? 3001 : 3000);

app.use(express.json());
app.use(cors());
const animatorRouter = require('./routes/animatorRouter');
const programRoutes = require('./routes/programRoutes');
const animatorRoutes = require('./routes/animatorRoutes');
const podcastRoutes = require('./routes/podcastRoutes');

app.use('/program', programRoutes);
app.use('/animator', animatorRoutes);
app.use('/animator1', animatorRouter);
app.use('/podcast', podcastRoutes);

const server = app.listen(PORT, () => {
  console.log(`🌍 Server is running on port ${PORT} `);
});

module.exports = server;
