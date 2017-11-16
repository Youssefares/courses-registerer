const Promise = require('bluebird');
const getConnection = require('../connection');


const addDepartmentToUsersSQL =
'ALTER TABLE `users` \
ADD COLUMN `department_id` INT NULL,\
ADD INDEX `department_id_idx` (`department_id` ASC),\
ADD CONSTRAINT `department_id` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`)\
';

Promise.using(getConnection(), connection => connection.query(addDepartmentToUsersSQL))
  .then(() => {
    console.log('foreign_key created and added successfully');
    process.exit(0);
  });
