const bodyParse = require('body-parser').json();
const Student = require('./../schemas/student');
const Teacher = require('./../schemas/teacher');
const makeAvailability = require('./../lib/makeAvailabilityObject');

module.exports = router => {
  router.post('*api/free-trial-request', bodyParse, (req, res) => {
    const bodyParams = Object.keys(req.body);
    if (!bodyParams.length) {
      return res.status(400).send('Bad Request: Request must include body');
    }

    const postResponse = {};

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
    } = req.body;

    const availability = makeAvailability(req.body.availability);

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
        postResponse.studentID = student._id;
        return null;
      })
      .then(() => Teacher.find({ instruments: { $in: [instrument] } }))
      .then(teachers => {
        console.log('Student availability: ', availability);
        teachers.map(teacher =>
          console.log(
            `Teacher ${teacher.name}'s availability: ${teacher.availability}`
          )
        );
        return res.json(postResponse);
      });
  });
};
