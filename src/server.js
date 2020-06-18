const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || (process.env.NODE_ENV === 'test' ? 3001 : 3000);

app.use(express.json());
app.use(cors());

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

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
