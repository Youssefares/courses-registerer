const Course = require('../models/course');
const Department = require('../models/department');
const faker = require('faker');

for (let i = 1; i < 8; i += 1) {
  Department.create({
    name: `${faker.lorem.word()} department`,
    description: faker.lorem.sentence()
  }).then((rows) => {
    for (let j = 1; j < 8; j += 1) {
      Course.create({
        department_id: rows.insertId,
        name: `${faker.lorem.word()} course`,
        description: faker.lorem.sentence(),
        credit_hours: faker.random.number() % 10,
        instructor_name: faker.name.findName()
      });
    }
  });
}
