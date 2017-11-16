const Course = require('../models/course');
const Department = require('../models/department');

Department.create({
  name: 'Compu',
  description: 'We study CS'
});

Course.create({
  department_id: 1,
  name: 'Database Systems',
  description: 'Databases course',
  credit_hours: 4,
  instructor_name: 'Dr Yasser'
});

process.exit(0);
