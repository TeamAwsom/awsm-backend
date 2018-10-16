module.exports = studentAvailabilityArray => {
  const availability = {};
  studentAvailabilityArray.map(ele => {
    availability[`${ele.day.toLowerCase()}`] = {
      fromTime: Number(ele.fromTime),
      toTime: Number(ele.toTime),
    };
    return null;
  });
  return availability;
};
