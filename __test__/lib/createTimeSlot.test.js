const createTimeSlot = require('./../../lib/createTimeSlot');
require('jest');

describe('Testing the createTimeSlot.js file', () => {
  const teacherObject1 = {
    _id: '5ba55c051140f90357a3c350',
    name: 'Breana Truman',
    email: 'bb@gmail.com',
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
  };

  const studentAvailability = {
    monday: {
      fromTime: 18,
      toTime: 19,
    },
    thursday: {
      fromTime: 18,
      toTime: 19,
    },
  };

  test('asldfj', () => {
    const expected = {
      name: 'Breana Truman',
      teacherID: '5ba55c051140f90357a3c350',
      email: 'bb@gmail.com',
      time: {
        day: 'thursday',
        hour: 17,
      },
    };
    expect(createTimeSlot(teacherObject1, studentAvailability)).toEqual(
      expected
    );
  });
});
