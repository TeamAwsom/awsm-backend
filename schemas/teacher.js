'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  availability: { type: Date, required: true },
  students: [{ type: Schema.Types.ObjectId, ref: 'student' }],
});

const Teacher = module.exports = mongoose.model('teacher', teacherSchema);

Teacher.findbyIdandAddStudent = function(id, student) {
  
}
