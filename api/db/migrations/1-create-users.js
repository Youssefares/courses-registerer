const Promise = require('bluebird');
const getConnection = require('../connection');

const createUsersSQL =
'CREATE TABLE users (\
  id int AUTO_INCREMENT,\
  email varchar(255) NOT NULL,\
  username varchar(255) NOT NULL,\
  password varchar(255) NOT NULL,\
  registration_date timestamp DEFAULT current_timestamp,\
  PRIMARY KEY (id), UNIQUE(email), UNIQUE(username)\
)';

Promise.using(getConnection(), connection => connection.query(createUsersSQL))
  .then(() => {
    console.log('table users created successfully');
    process.exit(0);
  });
