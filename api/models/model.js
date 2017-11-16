const getConnection = require('../db/connection');
const Promise = require('bluebird');

class Model {
  static get tableName() {
    const classNameRegEx = /(?:\S+\s+){1}([a-zA-Z_$][0-9a-zA-Z_$]*)/;
    return `${classNameRegEx.exec(this.toString())[1].toLowerCase()}s`;
  }

  static all() {
    const that = this;
    return Promise.using(
      getConnection(),
      connection => connection.query(`SELECT * FROM ${that.tableName}`)
    );
  }


  static findBy(fieldName, fieldValue) {
    const that = this;
    return Promise.using(getConnection(), connection => connection.query(
      `SELECT * FROM ${that.tableName} WHERE ${fieldName}=?`,
      [fieldValue]
    ));
  }
}

module.exports = Model;
