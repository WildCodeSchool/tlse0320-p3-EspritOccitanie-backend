const express = require('express');
const cors = require('cors');
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || (process.env.NODE_ENV === 'test' ? 3001 : 3000);

app.use(express.json());
app.use(cors());

const routes = require('./routes');

app.use('/', routes);

app.post('/Contact', function (req, res, next) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jerome.hamilka@gmail.com',
      pass: 'password'
    }
  }
  );
  var mailOptions = {
    from: req.body.sender,
    to: req.body.destination,
    subject: req.body.subject,
    text: req.body.message,
    html: '<b>' + req.body.message + '</b>'
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });

  transporter.close();
});

app.use(function (req, res) {
  res.sendStatus(404);
});

const server = app.listen(PORT, () => {
  console.log(`🌍 Server is running on port ${PORT} `);
});

module.exports = server;
