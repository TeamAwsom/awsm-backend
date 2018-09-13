const mongoose = require('mongoose');

const { Schema } = mongoose;

const teacherSchema = Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  availability: [
    {
      day: { type: String },
      fromTime: { type: Number },
      toTime: { type: Number },
    },
  ],
  students: [{ type: Schema.Types.ObjectId, ref: 'student' }],
});

const Teacher = mongoose.model('teacher', teacherSchema);

Teacher.findbyIdandAddStudent = (id, student) => {
  console.log('Function not yet implemented', id, student);
};

module.exports = Teacher;
