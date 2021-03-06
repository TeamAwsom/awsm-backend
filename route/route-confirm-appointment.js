const superagent = require('superagent');
const moment = require('moment');
const bodyParse = require('body-parser').json();
const Student = require('./../schemas/student');
const Teacher = require('./../schemas/teacher');

function createTimeslotDate(day, time) {
  let timeslotDate = moment().day(day).hour(time).minute(0)
  return timeslotDate.format()
}

module.exports = router => {
  router.post('/api/confirm-appointment', bodyParse, async (req, res) => {

    if (!Object.keys(req.body).length) {
      return res.status(400).send('Bad Request: Request must include body');
    }

    const {
      studentID,
      name,
      email,
      phone,
      studentName,
      birthDate,
      hearAbout,
      teacherId,
      timeslot
    } = req.body;

    if (
      !(
        studentID &&
        name &&
        email &&
        phone &&
        studentName &&
        birthDate &&
        hearAbout &&
        teacherId &&
        timeslot
      )
    ) {
      return res
        .status(400)
        .send('Bad Request: Request body missing required properties');
    }

    try {

      const student = await Student.findOne({_id: studentID}).exec();

      if (!student) {
        return res.status(404).send('Student not found');
      }

      const teacher = await Teacher.findOne({_id: teacherId}).exec();

      if (!teacher) {
        return res.status(404).send('Teacher not found');
      }

      student.name = name;
      student.studentName = studentName;
      student.email = email;
      student.phone = phone;
      student.birthDate = birthDate;
      student.hearAbout = hearAbout;
      student.comments = req.body.comments;
      student.teacherId = teacher;
      student.hasCompletedReg = true;

      const savedStudent = await student.save();

      teacher.students.push(savedStudent);

      const savedTeacher = await teacher.save();

      try {
        const timeslotDate = createTimeslotDate(
          timeslot.time.day,
          timeslot.time.hour
        )
        await superagent
          .post(process.env.SALES_FORCE_WEBHOOK)
          .send({
            teacher: savedTeacher.toObject(),
            student: savedStudent.toObject(),
            timeslot: timeslot,
            timeslotDate: timeslotDate,
            timestamp: moment().format()
          });
        console.log('POST sent to Salesforce webhook...');
      } catch(err) {
        console.log('Error sending to Salesforce webhook:');
        console.log(err);
        return res.status(500).send('Server Error');
      }

      return res.status(200).send('Success');

    } catch(err) {
      console.log(err);
      return res.status(500).send('Server Error');
    }

  });
};
