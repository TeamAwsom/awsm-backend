const client = require('superagent');

module.exports = (origin, destination) => {
  return new Promise((resolve, reject) => {
    client
      .get('https://maps.googleapis.com/maps/api/distancematrix/json')
      .query({ destinations: destination })
      .query({ origins: origin })
      .query({ mode: 'driving' })
      .query({ units: 'imperial' })
      .query({ key: process.env.MAPS_KEY })
      .then(res => {
        resolve(res.body);
      })
      .catch(err => {
        reject(err);
      });
  });
};
