'use strict'

const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const studentSchema = Schema ({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone:  { type: String, required: true },
  appointment: { type: Date, required },
});

module.exports = mongoose.model('student', studentSchema);


