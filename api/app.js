require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const User = require('./models/user');

// Init express
const app = express();
app.use(bodyParser.json());

// Use morgan for logging
app.use(morgan('dev'));

// Routes

app.get('/', (req, res) => {
  res.send('index that does absolutely nothing');
});

app.post('/signup', (req, res) => {
  User.create(req.body).then((rows) => {
    // Created
    const token = jwt.sign({ id: rows.insertId }, process.env.JWT_SECRET, {
      expiresIn: 86400, // expires in 24 hours
    });
    res.status(201);
    res.json({
      auth: true,
      token,
    });
  }).catch((err) => {
    // Unprocessable entity
    res.status(422);
    res.json(err.message);
  });
});

// Start listening for requests
app.listen(process.env.PORT || 3000);
