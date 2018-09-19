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
    addressOne: '12209 NE 85th St',
    addressTwo: '',
    city: 'Kirkland',
    state: 'WA',
    zip: '98033',
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
    addressOne: '2255 Carillon Point',
    addressTwo: '',
    city: 'Kirkland',
    state: 'WA',
    zip: '98033',
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
  {
    name: 'Peter Billings',
    email: 'petebills@gmail.com',
    addressOne: '19100 44th Ave W',
    addressTwo: '',
    city: 'Lynnwood',
    state: 'WA',
    zip: '98046',
    availability: [
      {
        day: 'monday',
        fromTime: 17,
        toTime: 21,
      },
      {
        day: 'tuesday',
        fromTime: 17,
        toTime: 21,
      },
      {
        day: 'wednesday',
        fromTime: 17,
        toTime: 21,
      },
      {
        day: 'thursday',
        fromTime: 17,
        toTime: 21,
      },
      {
        day: 'friday',
        fromTime: 17,
        toTime: 21,
      },
      {
        day: 'saturday',
        fromTime: 8,
        toTime: 17,
      },
    ],
    students: [],
  },
  {
    name: 'Susan Kentworth',
    email: 'suzie1986@gmail.com',
    addressOne: '220 Fourth Ave. S.',
    addressTwo: '',
    city: 'Kent',
    state: 'WA',
    zip: '98032',
    availability: [
      {
        day: 'monday',
        fromTime: 13,
        toTime: 20,
      },
      {
        day: 'tuesday',
        fromTime: 15,
        toTime: 21,
      },
      {
        day: 'wednesday',
        fromTime: 17,
        toTime: 19,
      },
      {
        day: 'thursday',
        fromTime: 13,
        toTime: 20,
      },
      {
        day: 'sunday',
        fromTime: 8,
        toTime: 17,
      },
    ],
    students: [],
  },
  {
    name: 'Alma Luna-Mendez',
    email: 'soulmoon@gmail.com',
    addressOne: '9600 College Way N',
    addressTwo: '',
    city: 'Seattle',
    state: 'WA',
    zip: '98103',
    availability: [
      {
        day: 'monday',
        fromTime: 6,
        toTime: 12,
      },
      {
        day: 'tuesday',
        fromTime: 13,
        toTime: 17,
      },
      {
        day: 'wednesday',
        fromTime: 6,
        toTime: 15,
      },
      {
        day: 'thursday',
        fromTime: 8,
        toTime: 17,
      },
      {
        day: 'friday',
        fromTime: 6,
        toTime: 12,
      },
      {
        day: 'saturday',
        fromTime: 8,
        toTime: 17,
      },
      {
        day: 'sunday',
        fromTime: 13,
        toTime: 21,
      },
    ],
    students: [],
  },
  {
    name: 'Dan Dingleman',
    email: 'dannyd@gmail.com',
    addressOne: '1701 Broadway',
    addressTwo: '',
    city: 'Seattle',
    state: 'WA',
    zip: '98122',
    availability: [
      {
        day: 'monday',
        fromTime: 8,
        toTime: 17,
      },
      {
        day: 'tuesday',
        fromTime: 8,
        toTime: 17,
      },
      {
        day: 'wednesday',
        fromTime: 8,
        toTime: 17,
      },
      {
        day: 'thursday',
        fromTime: 8,
        toTime: 17,
      },
      {
        day: 'friday',
        fromTime: 8,
        toTime: 17,
      },
      {
        day: 'saturday',
        fromTime: 8,
        toTime: 17,
      },
      {
        day: 'sunday',
        fromTime: 8,
        toTime: 17,
      },
    ],
    students: [],
  },
];

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
