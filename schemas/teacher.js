'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  availability: { type: Date, required: true },
});

module.exports = mongoose.model('teacher', teacherSchema);


