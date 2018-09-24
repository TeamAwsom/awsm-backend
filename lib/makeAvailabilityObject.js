module.exports = studentAvailabilityArray => {
  const availability = {};
  studentAvailabilityArray.map(ele => {
    availability[`${ele.day}`] = {
      fromTime: ele.fromTime,
      toTime: ele.toTime,
    };
    return null;
  });
  return availability;
};
