const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
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

// FIXME: look at creation and return proper status code and response
app.post('/signup', (req, res) => {
  User.create(req.body);
  res.json('User created successfully');
});

// Start listening for requests
app.listen(process.env.PORT || 3000);
