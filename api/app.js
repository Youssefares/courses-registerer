require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const cors = require('cors');
const User = require('./models/user');
const authenticateUser = require('./helpers/authenticateUser');
// Init express
const app = express();
app.use(bodyParser.json());

// Use morgan for logging
app.use(morgan('dev'));

// Allow cross-origin
app.use(cors());

// Authentication Middleware for all except signin & signup
app.all('*', authenticateUser);

// Routes

app.get('/', (req, res) => {
  res.send('index that does absolutely nothing');
});

app.post('/signup', (req, res) => {
  if (!('password' in req.body && 'username' in req.body &&
    'email' in req.body)) {
    res.status(422);
    res.json('Required: email & username && password');
    return;
  }
  User.create(req.body).then((rows) => {
    // Created
    const token = jwt.sign({ id: rows.insertId }, process.env.JWT_SECRET, {
      expiresIn: '7d' // expires in a week
    });
    res.status(201);
    res.json({
      auth: true,
      token
    });
  }).catch((err) => {
    // Unprocessable entity
    res.status(422);
    res.json(err.message);
  });
});

app.post('/signin', (req, res) => {
  if (!('password' in req.body && 'username' in req.body)) {
    res.status(422);
    res.json('Required: username && password');
    return;
  }
  User.findBy('username', req.body.username).then((rows) => {
    if (md5(req.body.password) !== rows[0].password) {
      // Unauthorized
      res.status(401);
      res.json('incorrect password');
      return;
    }
    const token = jwt.sign({ id: rows.insertId }, process.env.JWT_SECRET, {
      expiresIn: '7d' // expires in a week
    });
    res.status(200);
    res.json({
      auth: true,
      token
    });
  }).catch((err) => {
    res.status(400);
    res.json(err.message);
  });
});

// Start listening for requests
app.listen(process.env.PORT || 4000);
