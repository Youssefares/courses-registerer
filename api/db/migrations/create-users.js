const connection = require('../connection');

const createUsersSQL =
'CREATE TABLE users (\
  id int AUTO_INCREMENT,\
  email varchar(255) NOT NULL,\
  username varchar(255) NOT NULL,\
  password varchar(255) NOT NULL,\
  registration_date timestamp DEFAULT current_timestamp,\
  PRIMARY KEY (id), UNIQUE(email), UNIQUE(username)\
)';

connection.query(createUsersSQL, (error) => {
  if (error) {
    throw error;
  }
});

connection.end();
