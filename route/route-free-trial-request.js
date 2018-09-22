const bodyParse = require('body-parser').json();
const Student = require('./../schemas/student');

module.exports = router => {
  router.post('*api/free-trial-request', bodyParse, (req, res) => {
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
    return new Student(req.body).save().then(student => res.json(student));
  });
};
