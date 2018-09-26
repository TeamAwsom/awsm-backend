module.exports = (teacherObject, studentAvailability) => {
  const timeSlot = {
    name: teacherObject.name,
    teacherID: teacherObject._id,
    email: teacherObject.email,
    time: {
      day: 'thursday',
      hour: 17,
    },
  };

  return timeSlot;
};
