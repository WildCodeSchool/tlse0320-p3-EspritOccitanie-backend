const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || (process.env.NODE_ENV === 'test' ? 3001 : 3000);
const connection = require('../db');

app.use(express.json());
app.use(cors());

const programRoutes = require('./routes/programRoutes');
const animatorRoutes = require('./routes/animatorRoutes');
const podcastRoutes = require('./routes/podcastRoutes');

app.use('/program', programRoutes);
app.use('/animator', animatorRoutes);
app.use('/podcast', podcastRoutes);

const server = app.listen(PORT, () => {
  console.log(`🌍 Server is running on port ${PORT} `);
});

module.exports = server;
