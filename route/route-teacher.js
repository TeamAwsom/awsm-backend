const bodyParse = require('body-parser').json();
const Teacher = require('./../schemas/teacher');

module.exports = router => {
  router.put('/api/teacher', bodyParse, async (req, res) => {
    const {
      instruments,
      students,
      name,
      addressOne,
      addressTwo,
      city,
      state,
      zip,
      availability
    } = req.body;

    const teacher = await Teacher.findOne({ email: req.body.email }).exec();
    if (!teacher) {
      return res.status(404).send('Teacher not found');
    }
    teacher.instruments = instruments;
    teacher.students = students;
    teacher.name = name;
    teacher.addressOne = addressOne;
    teacher.addressTwo = addressTwo;
    teacher.city = city;
    teacher.state = state;
    teacher.zip = zip;
    teacher.availability = availability;
    try {
      await teacher.save();
    } catch (err) {
      console.log('Error while saving to the database:\n', err);
    }

    return res.status(200).send('Teacher successfully saved!');
  });
};
