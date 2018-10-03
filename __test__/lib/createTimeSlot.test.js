const createTimeSlot = require('./../../lib/createTimeSlot');
require('jest');

describe('Testing the createTimeSlot.js file', () => {
  const teacherObject1 = [
    {
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
    },
    {
      _id: '5ba55c051140f90357a3c34a',
      name: 'Alex Bisky',
      email: 'rtnsjw@gmail.com',
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
    },
    {
      _id: '5ba55c051140f90357a3c35e',
      name: 'Susan Kentworth',
      email: 'suzie1986@gmail.com',
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
    },
  ];

  const studentAvailability1 = {
    monday: {
      fromTime: 18,
      toTime: 19,
    },
    thursday: {
      fromTime: 18,
      toTime: 19,
    },
  };

  const studentAvailability2 = {
    monday: {
      fromTime: 17,
      toTime: 19,
    },
    thursday: {
      fromTime: 18,
      toTime: 19,
    },
  };

  test('Will create correct time slot when passed teacher object and student availability', () => {
    const expected1 = [
      {
        name: 'Breana Truman',
        teacherID: '5ba55c051140f90357a3c350',
        email: 'bb@gmail.com',
        time: {
          day: 'monday',
          hour: 18,
        },
      },
      {
        name: 'Breana Truman',
        teacherID: '5ba55c051140f90357a3c350',
        email: 'bb@gmail.com',
        time: {
          day: 'thursday',
          hour: 18,
        },
      },
    ];

    const expected2 = [
      {
        name: 'Breana Truman',
        teacherID: '5ba55c051140f90357a3c350',
        email: 'bb@gmail.com',
        time: {
          day: 'monday',
          hour: 17,
        },
      },
      {
        name: 'Breana Truman',
        teacherID: '5ba55c051140f90357a3c350',
        email: 'bb@gmail.com',
        time: {
          day: 'monday',
          hour: 18,
        },
      },
      {
        name: 'Breana Truman',
        teacherID: '5ba55c051140f90357a3c350',
        email: 'bb@gmail.com',
        time: {
          day: 'thursday',
          hour: 18,
        },
      },
    ];
    expect(createTimeSlot(teacherObject1, studentAvailability1)).toEqual(
      expected1
    );
    expect(createTimeSlot(teacherObject1, studentAvailability2)).toEqual(
      expected2
    );
  });
});
