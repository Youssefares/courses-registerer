const Promise = require('bluebird');
const getConnection = require('../connection');

const createCoursesSQL =
'CREATE TABLE courses (\
  id int AUTO_INCREMENT,\
  department_id int NOT NULL,\
  name varchar(255) NOT NULL,\
  description varchar(255),\
  credit_hours int,\
  instructor_name varchar(255),\
  PRIMARY KEY (id),\
  FOREIGN KEY (department_id) REFERENCES departments(id)\
)';


Promise.using(getConnection(), (connection) => {
  connection.query(createCoursesSQL);
}).then(() => {
  console.log('table courses created successfully');
  process.exit(0);
});
