const moment = require('moment');

function createTimeslotDate(day, time) {
  let timeslotDate = moment().day(day).hour(time).minute(0)
  return timeslotDate.format()
}

console.log(createTimeslotDate('sunday', 10))
