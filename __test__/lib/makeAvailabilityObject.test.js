const makeAvailability = require('./../../lib/makeAvailabilityObject');

describe('Testing the makeAvailabilityObj.js', () => {
  const sample = [
    { day: 'Monday', fromTime: 18, toTime: 19 },
    { day: 'Thursday', fromTime: 18, toTime: 19 },
  ];
  const result = {
    Monday: {
      fromTime: 18,
      toTime: 19,
    },
    Thursday: {
      fromTime: 18,
      toTime: 19,
    },
  };
  test('Should convert array to dictionary object properly', () => {
    expect(makeAvailability(sample)).toEqual(result);
  });
});
