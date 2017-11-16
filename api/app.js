require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const cors = require('cors');
const User = require('./models/user');
const Department = require('./models/department');
const Course = require('./models/course');
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

app.get('/departments', (req, res) => {
  Department.all().then((rows) => {
    res.status(200);
    res.json(rows);
  });
});

app.get('/courses', (req, res) => {
  if (!('body' in req && 'department_id' in req.body)) {
    Course.all().then((rows) => {
      res.status(200);
      res.json(rows);
    });
  } else {
    Course.findBy('department_id', req.body.department_id).then((rows) => {
      res.status(200);
      res.json(rows);
    });
  }
});

app.post('/signup', (req, res) => {
  if (!('body' in req && 'password' in req.body && 'username' in req.body &&
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
  if (!('body' in req && 'password' in req.body && 'username' in req.body)) {
    res.status(422);
    res.json('Required: username & password');
    return;
  }
  User.findBy('username', req.body.username).then((rows) => {
    if (rows[0] == null) {
      throw new Error('user not found');
    }
    if (md5(req.body.password) !== rows[0].password) {
      // Unauthorized
      res.status(401);
      res.json('incorrect password');
      return;
    }
    const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET, {
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

app.put('/enroll', (req, res) => {
  if (!('body' in req && 'user_id' in req.body && 'department_id' in req.body)) {
    res.status(422);
    res.json('Required: user_id & department_id');
    return;
  }
  User.enrollDepartment(req.body.user_id, req.body.department_id).then(() => {
    res.status(200);
    res.json('Student enrolled successfully');
  });
});


// Start listening for requests
app.listen(process.env.PORT || 4000);
