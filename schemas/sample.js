const db = {};

db.students.insertMany([
  {
    name: 'steve Brown',
    address: '123 jump st',
    phone: '123-456-7890',
    appointment: 10 - 21 - 2018,
  },
  {
    name: 'charlie Brown',
    address: '124 jump st',
    phone: '123-456-7550',
    appointment: 10 - 21 - 2018,
  },
  {
    name: 'stan Brown',
    address: '423 jump st',
    phone: '323-456-7890',
    appointment: 10 - 21 - 2018,
  },
  {
    name: 'saul Brown',
    address: '223 jump st',
    phone: '423-456-7890',
    appointment: 10 - 21 - 2018,
  },
  {
    name: 'steve Brown',
    address: '123 jump st',
    phone: '523-456-7890',
    appointment: 10 - 21 - 2018,
  },
]);

const sampleRequest = {
  instrument: 'piano',
  style: 'classical',
  experience: 0,
  ownsInstrument: false,
  address: '123 Fake Place Seattle, WA 98101',
  dayOfWeek: 'Thursday',
  allergies: '',
  specialNeeds: '',
};
