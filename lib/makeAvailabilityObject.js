module.exports = studentAvailabilityArray => {
  const availability = {};
  studentAvailabilityArray.map(ele => {
    availability[`${ele.day.toLowerCase()}`] = {
      fromTime: ele.fromTime,
      toTime: ele.toTime,
    };
    return null;
  });
  return availability;
};
