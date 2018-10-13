module.exports = (instrument, teachers) => {
  return teachers.find({
    instruments: { $in: [instrument] },
  }).lean();
};
