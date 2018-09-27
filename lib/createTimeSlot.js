module.exports = (teacherObject, studentAvailability) => {
  function TimeSlot() {
    this.name = teacherObject.name;
    this.teacherID = teacherObject._id;
    this.email = teacherObject.email;
    this.createTime();
    this.time = {};
    // time: {
    //   day: 'thursday',
    //   hour: 17,
    // },
  }

  TimeSlot.prototype.createTime = () => {
    this.time = {
      day: 'thursday',
      hour: 17,
    };
  };

  const response = new TimeSlot();

  return response;
};
