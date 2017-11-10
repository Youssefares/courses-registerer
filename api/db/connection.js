const mysql = require('promise-mysql');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'registerer_dev',
  connectionLimit: 10
});

module.exports = () => pool.getConnection().disposer((connection) => {
  pool.releaseConnection(connection);
});
