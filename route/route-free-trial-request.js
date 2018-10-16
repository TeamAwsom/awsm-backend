const bodyParse = require('body-parser').json();
const Student = require('./../schemas/student');
const Teacher = require('./../schemas/teacher');
const makeAvailability = require('./../lib/makeAvailabilityObject');
const filterTeachersByAvailability = require('./../lib/filterTeachersByAvailability');
const filterTeachersByInstrument = require('./../lib/filterTeachersByInstrument');
const createAddress = require('./../lib/createAddrString');
const findDistance = require('./../lib/distanceMatrixAPI');
const createTimeSlot = require('./../lib/createTimeSlot');

module.exports = router => {
  router.post('/api/free-trial-request', bodyParse, async (req, res) => {
    if (!Object.keys(req.body).length) {
      return res.status(400).send('Bad Request: Request must include body');
    }

    let {
      addressOne,
      city,
      state,
      zip,
      instrument,
      musicStyle,
      experienceLevel,
      availability,
    } = req.body;

    if (
      !(
        addressOne &&
        city &&
        state &&
        zip &&
        instrument &&
        musicStyle &&
        experienceLevel &&
        availability &&
        'hasInstrument' in req.body
      )
    ) {
      return res
        .status(400)
        .send('Bad Request: Request body missing required properties');
    }

    try {
      const postResponse = {};
      const studentAvailability = makeAvailability(availability);

      req.body.instrument = req.body.instrument.toUpperCase();
      instrument = req.body.instrument;
      const student = await new Student(req.body).save();

      postResponse.studentID = student._id;

      const teachers = await filterTeachersByInstrument(
        instrument,
        Teacher
      );

      if (!teachers.length) {
        return res.status(200).send({ message: 'no matches found: Instrument' });
      }

      const availableTeachers = filterTeachersByAvailability(
        studentAvailability,
        teachers
      );

      if (!availableTeachers.length) {
        return res.status(200).send({ message: 'no matches found: Availability' });
      }

      const studentAddress = createAddress(req.body);

      for (const teacher of availableTeachers) {
        const teacherAddress = createAddress(teacher);
        teacher.distance = await findDistance(teacherAddress, studentAddress);
        let seconds = teacher.distance.rows[0].elements[0].duration.value;
        let minutes = seconds/60;
        if(minutes > 30){
          let index = availableTeachers.indexOf(teacher);
          availableTeachers.splice(index,1);
        }
      }

      if (!availableTeachers.length) {
        return res.status(200).send({ message: 'no matches found: Duration' });
      }

      const sortedArray = availableTeachers.sort((a, b) => {
        return (
          a.distance.rows[0].elements[0].duration.value -
          b.distance.rows[0].elements[0].duration.value
        );
      });

      postResponse.suggestedTimeSlots = await createTimeSlot(
        sortedArray.slice(0, 3),
        studentAvailability
      );

      return res.status(200).json(postResponse);
    } catch (err) {
      console.log(err);
      return res.status(500).send('Server Error');
    }
  });
};
