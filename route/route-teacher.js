const bodyParse = require('body-parser').json();
const Teacher = require('./../schemas/teacher');

module.exports = router => {
  router.get('/api/teacher/:email', async (req, res) => {
    console.log('email: ', req.params.email);
    try {
      const teacher = await Teacher.find({
        email: { $in: req.params.email },
      });
      return res.status(200).json(teacher);
    } catch (err) {
      console.log(err);
      return res.status(500).send('Server Error');
    }
  });
  // router.post('/api/teacher', bodyParse, async (req, res) => {

  // })
  // router.put('/api/teacher', bodyParse, async (req, res) => {

  // })
  // router.delete('/api/teacher', async (req, res) => {

  // })
};
