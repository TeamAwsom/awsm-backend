module.exports = (instrument, teachers) => {

  instrument = instrument.toUpperCase();

  return teachers.find({
    instruments: { $in: [instrument] },
  }).lean();
};
