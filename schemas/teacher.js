'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  appointment: { type: Date, required },
});

module.exports = mongoose.model('teacher', teacherSchema);


