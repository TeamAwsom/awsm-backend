const bodyParse = require('body-parser').json();
const Student = require('./../schemas/student');
const Teacher = require('./../schemas/teacher');
const makeAvailability = require('./../lib/makeAvailabilityObject');
const availableTeachers = require('./../lib/filterTeachersByAvailability');

module.exports = router => {
  router.post('*api/free-trial-request', bodyParse, (req, res) => {
    const postResponse = {};
    const bodyParams = Object.keys(req.body);

    if (!bodyParams.length) {
      return res.status(400).send('Bad Request: Request must include body');
    }

    const {
      addressOne,
      city,
      state,
      zip,
      instrument,
      musicStyle,
      allergies,
      specialNeeds,
      comments,
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
        allergies &&
        specialNeeds &&
        comments &&
        experienceLevel &&
        availability &&
        'hasInstrument' in req.body
      )
    ) {
      return res
        .status(400)
        .send('Bad Request: Request body missing required properties');
    }

    const studentAvailability = makeAvailability(availability);

    return new Student(req.body)
      .save()
      .then(student => {
        postResponse.studentID = student._id;
        return null;
      })
      .then(() => Teacher.find({ instruments: { $in: [instrument] } }))
      .then(teachers => {
        if (!teachers.length) {
          console.log(
            `There are no teachers available that teach ${instrument}.`
          );
          // need to handle this differently to send correct response.
          // Maybe throw an error and catch the error to send a custom response.
        }

        return availableTeachers(studentAvailability, teachers);
      })
      .then(filteredTeachers => {
        if (!filteredTeachers.length) {
          console.log(
            `There are no teachers available that teach ${instrument} at the selected dates/hours.`
          );
          // need to handle this differently to send correct response.
          // Maybe throw an error and catch the error to send a custom response.
        }
        console.log('Filtered Teachers array:\n', filteredTeachers);
      })
      .then(() => res.json(postResponse));
  });
};
