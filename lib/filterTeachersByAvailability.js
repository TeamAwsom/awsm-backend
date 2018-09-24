module.exports = (studentAvailability, teachersArray) =>
  teachersArray.filter(teacher => {
    let include;
    teacher.availability.map(dayAvailable => {
      if (`${dayAvailable.day}` in studentAvailability) {
        // x1 <= y2 && y1 <= x2
        if (
          studentAvailability[dayAvailable.day].fromTime <
            dayAvailable.toTime &&
          dayAvailable.fromTime < studentAvailability[dayAvailable.day].toTime
        ) {
          include = true;
        }
      }
      return null;
    });
    if (include) {
      return include;
    }
    return false;
  });
