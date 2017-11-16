const Promise = require('bluebird');
const getConnection = require('../connection');

const createDepartmentsSQL =
'CREATE TABLE departments (\
  id int AUTO_INCREMENT,\
  name varchar(255) NOT NULL,\
  description varchar(255),\
  PRIMARY KEY (id)\
)';


Promise.using(getConnection(), connection => connection.query(createDepartmentsSQL))
  .then(() => {
    console.log('table departments created successfully');
    process.exit(0);
  });
