const mongoose = require('mongoose');

const { Schema } = mongoose;

const studentSchema = Schema ({

  name: { type: String, required: true },
  studentName: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  birthDate: { type: Date, required: true },
  availability: { type: Date, required: true },
  instrument: { type: String, required: true },
  comments: { type: String, required: true },
  hearAbout: { type: String, required: true },
  experienceLevel: { type: String, required: true },
  teacherId: { type: Schema.Types.ObjectId, required: true },
});

module.exports = mongoose.model('student', studentSchema);
