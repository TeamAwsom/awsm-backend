const mongoose = require('mongoose');
require('dotenv').config();
mongoose.Promise = require('bluebird');

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true }
);
mongoose.set('useCreateIndex', true);

const Teacher = require('../schemas/teacher');

const sampleTeachers = [
  {
    name: 'Alex Bisky',
    email: 'rtnsjw@gmail.com',
    address: '12209 NE 85th St, Kirkland, WA 98033',
    availability: [
      {
        day: 'monday',
        fromTime: 0,
        toTime: 24,
      },
      {
        day: 'thursday',
        fromTime: 0,
        toTime: 24,
      },
      {
        day: 'friday',
        fromTime: 0,
        toTime: 24,
      },
      {
        day: 'saturday',
        fromTime: 0,
        toTime: 19,
      },
      {
        day: 'sunday',
        fromTime: 0,
        toTime: 24,
      },
    ],
    students: [],
  },
  {
    name: 'Breana Truman',
    email: 'bb@gmail.com',
    address: '2255 Carillon Point, Kirkland, WA 98033',
    availability: [
      {
        day: 'monday',
        fromTime: 17,
        toTime: 24,
      },
      {
        day: 'tuesday',
        fromTime: 17,
        toTime: 24,
      },
      {
        day: 'wednesday',
        fromTime: 0,
        toTime: 15,
      },
      {
        day: 'thursday',
        fromTime: 11,
        toTime: 24,
      },
      {
        day: 'friday',
        fromTime: 0,
        toTime: 24,
      },
      {
        day: 'saturday',
        fromTime: 17,
        toTime: 24,
      },
    ],
    students: [],
  },
];

// utilize mongoose insert many to poplate teacher in DB, maybe create Array of teacher objects.
Teacher.insertMany(sampleTeachers)
  .then(teachers => {
    console.log('Sample teachers loaded into the DB');
    return teachers;
  })
  .then(() => mongoose.disconnect())
  .catch(err => {
    console.error(err);
    return mongoose.disconnect();
  });
