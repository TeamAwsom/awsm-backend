const mongoose = require('mongoose');
const instruments = require('../instruments.json');

const { Schema } = mongoose;

const teacherSchema = Schema({
  name: { type: String, required: true },
  phone: { type: String },
  email: { type: String, required: true, unique: true },
  addressOne: { type: String, required: true },
  addressTwo: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  instruments: [{ type: String, enum: instruments.list }],
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
