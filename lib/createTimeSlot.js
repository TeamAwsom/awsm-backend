module.exports = (teachersArray, studentAvailability) => {
  const timeSlots = [];

  const determineFirstAvailable = (dayString, next) => {
    return {
      day: dayString,
      hour: next,
    };
  };

  class TimeSlot {
    constructor(name, id, email, day, next) {
      this.name = name;
      this.teacherID = id;
      this.email = email;
      this.time = determineFirstAvailable(day, next);
    }
  }

  teachersArray.map(teacher => {
    teacher.availability.map(dayAvailable => {
      if (`${dayAvailable.day}` in studentAvailability) {
        const start =
          studentAvailability[dayAvailable.day].fromTime > dayAvailable.fromTime
            ? studentAvailability[dayAvailable.day].fromTime
            : dayAvailable.fromTime;
        const end =
          studentAvailability[dayAvailable.day].toTime < dayAvailable.toTime
            ? studentAvailability[dayAvailable.day].toTime
            : dayAvailable.toTime;

        for (let i = start; i < end; i += 1) {
          timeSlots.push(
            new TimeSlot(
              teacher.name,
              teacher._id,
              teacher.email,
              dayAvailable.day,
              i
            )
          );
        }
      }
      return null;
    });
    return null;
  });

  return timeSlots
    .filter((val, idx, arr) => {
      const compareIndex = arr.findIndex(x => {
        return x.time.day === val.time.day && x.time.hour === val.time.hour;
      });
      return compareIndex === idx;
    })
    .slice(0, 3);
};
