const bodyParse = require('body-parser').json();
const Student = require('./../schemas/student');
const Teacher = require('./../schemas/teacher');

module.exports = router => {
  router.post('*api/free-trial-request', bodyParse, (req, res) => {
    const bodyParams = Object.keys(req.body);
    if (!bodyParams.length) {
      return res.status(400).send('Bad Request: Request must include body');
    }
    let studentInfo = {};
    let teacherInfo = {};
    const {
      addressOne,
      city,
      state,
      zip,
      instrument,
      // hasInstrument,
      musicStyle,
      allergies,
      specialNeeds,
      comments,
      experienceLevel,
    } = req.body;

    if (
      !(
        addressOne &&
        city &&
        state &&
        zip &&
        instrument &&
        musicStyle &&
        allergies &&
        specialNeeds &&
        comments &&
        experienceLevel &&
        'hasInstrument' in req.body
      )
    ) {
      return res
        .status(400)
        .send('Bad Request: Request body missing required properties');
    }
    return new Student(req.body)
      .save()
      .then(student => {
        studentInfo = student;
        return studentInfo;
      })
      .then(() => Teacher.find({ instruments: { $in: [instrument] } }))
      .then(teacher => {
        console.log('Teacher: ', teacher);
        teacherInfo = teacher;
        return teacherInfo;
      })
      .then(monkey => {
        console.log('Student: ', studentInfo);
        // console.log('Teacher result: ', teacherInfo);
        return res.json(studentInfo);
      });
  });
};
