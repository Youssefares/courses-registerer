require('dotenv').config();
const mysql = require('promise-mysql');

const pool = mysql.createPool({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});


pool.getConnection().then((connection) => {
  connection.query('DROP DATABASE registerer_dev').then(() => {
    console.log('Database dropped successfully');
    connection.release();
    process.exit(0);
  });
});
