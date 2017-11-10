const Model = require('./model');
const getConnection = require('../db/connection');
const md5 = require('md5');
const Promise = require('bluebird');

class User extends Model {
  static create(args) {
    return Promise.using(getConnection(), connection => connection.query(
      'INSERT INTO users (email, username, password) VALUES (?, ?, ?)',
      [args.email, args.username, md5(args.password)]
    ));
  }

  static findBy(fieldName, fieldValue) {
    return Promise.using(getConnection(), connection => connection.query(
      `SELECT * FROM users WHERE ${fieldName}=?`,
      [fieldValue]
    ));
  }
}

module.exports = User;
