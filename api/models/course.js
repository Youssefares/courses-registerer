const Model = require('./model');
const Promise = require('bluebird');
const getConnection = require('../db/connection');

class Course extends Model {
  static create(args) {
    return Promise.using(getConnection(), connection => connection.query(
      'INSERT INTO courses (department_id, name, description, credit_hours, instructor_name)\
      VALUES (?, ?, ?, ?, ?)',
      [args.department_id, args.name, args.description, args.credit_hours, args.instructor_name]
    ));
  }
}

module.exports = Course;
