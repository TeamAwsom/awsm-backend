const findDistance = require('./../lib/distanceMatrixAPI');
const createAddress = require('./../lib/createAddrString');

// Max travel duration for teacher
// TODO: set to teacher prefered value.
let maxTravelDuration = 30;

module.exports = async (availableTeachers, studentAddress) => {
  for (const teacher of availableTeachers) {
    const teacherAddress = createAddress(teacher);
    teacher.distance = await findDistance(teacherAddress, studentAddress);
    let duration = teacher.distance.rows[0].elements[0].duration.value/60;
    if(duration > maxTravelDuration){
      let index = availableTeachers.indexOf(teacher);
      availableTeachers.splice(index,1);
    }
  }
};
