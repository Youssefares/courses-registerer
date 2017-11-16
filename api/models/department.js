const Model = require('./model');
const getConnection = require('../db/connection');
const Promise = require('bluebird');


class Department extends Model {
  static create(args) {
    return Promise.using(getConnection(), connection => connection.query(
      'INSERT INTO departments (name, description) VALUES (?, ?)',
      [args.name, args.description]
    ));
  }
}

module.exports = Department;
