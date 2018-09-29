const superagent = require('superagent');
const bodyParse = require('body-parser').json();
const Student = require('./../schemas/student');
const Teacher = require('./../schemas/teacher');

const salesforceWebhookUrl = 'https://hooks.zapier.com/hooks/catch/3148785/lt0i2d/'

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
        timeslot in req.body
      )
    ) {
      return res
        .status(400)
        .send('Bad Request: Request body missing required properties');
    }

    try {

      const student = Student.findOne({_id: studentID});

      if (!student) {
        return res.status(404).send('Student not found');
      }

      const teacher = Teacher.findOne({_id: teacherId});

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
        await superagent
          .post(salesforceWebhookUrl)
          .send({
            teacher: savedTeacher,
            student: savedStudent,
            timeslot: timeslot
          });
      } catch(err) {
        console.log('Error sending to Salesforce webhook:');
        console.log(err);
      }

      return res.status(200).send('Success');

    } catch(err) {
      console.log(err);
      return res.status(500).send('Server Error');
    }

  });
};
