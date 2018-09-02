const mongoose = require('mongoose');

const { Schema } = mongoose;

const studentSchema = Schema ({

  name: { type: String},
  studentName: { type: String},
  email: { type: String},
  address: { type: String, required: true },
  phone: { type: String},
  birthDate: { type: Date},
  availability: { type: Date, required: true },
  instrument: { type: String, required: true },
  comments: { type: String, required: true },
  hearAbout: { type: String},
  experienceLevel: { type: String, required: true },
  teacherId: { type: Schema.Types.ObjectId},
});

module.exports = mongoose.model('student', studentSchema);
