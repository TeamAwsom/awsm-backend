const mongoose = require('mongoose');
const instruments = require('../instruments.json');

const { Schema } = mongoose;

const studentSchema = Schema({
  name: { type: String },
  studentName: { type: String },
  email: { type: String },
  addressOne: { type: String, required: true },
  addressTwo: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  phone: { type: String },
  birthDate: { type: Date },
  availability: [
    {
      day: { type: String },
      fromTime: { type: Number },
      toTime: { type: Number },
    },
  ],
  instrument: { type: String, required: true, enum: instruments.list },
  hasInstrument: { type: Boolean, required: true },
  musicStyle: { type: String, required: true },
  allergies: { type: String },
  specialNeeds: { type: String },
  comments: { type: String },
  hearAbout: { type: String },
  experienceLevel: { type: String, required: true },
  hasCompletedReg: { type: Boolean, default: false },
  teacherId: { type: Schema.Types.ObjectId, ref: 'teacher' },
});

module.exports = mongoose.model('student', studentSchema);
