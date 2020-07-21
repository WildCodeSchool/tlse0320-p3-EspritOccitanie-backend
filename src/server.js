const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || (process.env.NODE_ENV === 'test' ? 3001 : 4000);

app.use(express.json());
app.use(cors());

const routes = require('./routes');

app.use('/', routes);

app.post('/Contact', (req) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'espritoccitanie@gmail.com',
      pass: 'Radioeo2021',
    },
  });
  const mailOptions = {
    from: req.body.sender,
    to: 'espritoccitanie@gmail.com',
    subject: req.body.subject,
    text: req.body.message,
    html: `<b>${req.body.message}</b>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    return console.log(`Message sent: ${info.response}`);
  });
  
  transporter.close();
});

app.use((req, res) => {
  res.sendStatus(404);
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../../tlse0320-p3-EspritOccitanie-front/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

const server = app.listen(PORT, () => {
  console.log(`🌍 Server is running on port ${PORT} `);
});

module.exports = server;
