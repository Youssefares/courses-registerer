require('dotenv').config();
const mysql = require('promise-mysql');

const pool = mysql.createPool({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'registerer_dev',
  connectionLimit: 10
});

module.exports = () => pool.getConnection().disposer((connection) => {
  pool.releaseConnection(connection);
});
