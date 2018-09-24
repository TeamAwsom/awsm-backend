const availableTeachers = require('./../../lib/filterTeachersByAvailability');
require('jest');

describe('Testing the filterTeachersByAvailability.js file', () => {
  const student1 = {
    monday: {
      fromTime: 15,
      toTime: 18,
    },
    thursday: {
      fromTime: 15,
      toTime: 18,
    },
  };

  const bob = {
    availability: [
      {
        day: 'monday',
        fromTime: 8,
        toTime: 17,
      },
    ],
  };

  const barbara = {
    availability: [
      {
        day: 'thursday',
        fromTime: 8,
        toTime: 17,
      },
    ],
  };

  const ann = {
    availability: [
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
        day: 'friday',
        fromTime: 8,
        toTime: 17,
      },
    ],
  };

  const cliff = {
    availability: [
      {
        day: 'monday',
        fromTime: 18,
        toTime: 24,
      },
      {
        day: 'thursday',
        fromTime: 8,
        toTime: 15,
      },
    ],
  };

  const teacherArray = [bob, barbara];
  const teacherArray2 = [bob, barbara, ann];
  const teacherArray3 = [ann];
  const teacherArray4 = [cliff];

  test('Array of teachers that all have hours that line up with students will return same array', () => {
    expect(availableTeachers(student1, teacherArray)).toEqual(teacherArray);
  });
  test('Array of teachers that not all have hours that line up with students will return a filtered array', () => {
    expect(availableTeachers(student1, teacherArray2)).toEqual(teacherArray);
  });
  test('Array of teachers that do not have hours that line up with students will return an empty array', () => {
    expect(availableTeachers(student1, teacherArray3)).toEqual([]);
  });
  test('Array of teachers that have hours that align but do not overlap with students will return an empty array', () => {
    expect(availableTeachers(student1, teacherArray4)).toEqual([]);
  });
});
