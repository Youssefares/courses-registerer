const Model = require('./model');
const connection = require('../db/connection');
const md5 = require('md5');

class User extends Model {
  static create(args) {
    connection.query(
      'INSERT INTO users (email, username, password) VALUES (?, ?, ?)',
      [args.email, args.username, md5(args.password)],
      (error) => {
        if (error) {
          console.log(error);
        }
      }
    );
  }
}

module.exports = User;
