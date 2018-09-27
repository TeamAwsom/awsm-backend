const bodyParse = require('body-parser').json();
const Student = require('./../schemas/student');
const Teacher = require('./../schemas/teacher');
const makeAvailability = require('./../lib/makeAvailabilityObject');
const availableTeachers = require('./../lib/filterTeachersByAvailability');
const createAddress = require('./../lib/createAddrString');
const findDistance = require('./../lib/distanceMatrixAPI');
const createTimeSlot = require('./../lib/createTimeSlot');

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
    let filteredTeachersArray = [];

    return new Student(req.body)
      .save()
      .then(student => {
        postResponse.studentID = student._id;
        return null;
      })
      .then(() => Teacher.find({ instruments: { $in: [instrument] } }).lean())
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
        filteredTeachersArray = filteredTeachers;
        return filteredTeachers;
      })
      .then(teachers => {
        const destination = createAddress(req.body);
        const response = teachers.map(async (teacher, idx) =>
          findDistance(createAddress(teacher), destination)
            .then(apiCall => {
              filteredTeachersArray[idx].distance = apiCall.body;
              return apiCall;
            })
            .then(call => {
              console.log('Made successful api call');
              return call;
            })
        );
        const resultsArray = Promise.all(response);
        return resultsArray;
      })
      .then(() =>
        filteredTeachersArray.sort(
          (a, b) =>
            a.distance.rows[0].elements[0].distance.value -
            b.distance.rows[0].elements[0].distance.value
        )
      )
      .then(sortedArray => {
        postResponse.suggestedTimeSlots = [];
        for (let i = 0; i < 3; i += 1) {
          postResponse.suggestedTimeSlots.push(
            createTimeSlot(sortedArray[i], studentAvailability)
          );
        }
      })
      .then(() => res.json(postResponse));
  });
};





module.exports = router => {
  router.post('/api/free-trial-request', bodyParse, async (req, res) => {

    if (!Object.keys(req.body).length) {
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

    const postResponse = {};

    const studentAvailability = makeAvailability(availability);
    let filteredTeachersArray = [];

    try {

      const student = await new Student(req.body).save();
      postResponse.studentID = student._id;

      const teachers = await Teacher.find({ instruments: { $in: [instrument] } }).lean()

      if ()

    } catch(err) {
      console.log(err);
      return res.status(500).send();
    }

  });
};
