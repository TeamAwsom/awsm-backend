var googleMapsClient = require('@google/maps').createClient({
  key: process.env.MAPS_KEY,
  Promise: Promise
});

const mapsAPI = module.exports;

mapsAPI.getDistanceMatrix = async (origin, destination) => {
  return await googleMapsClient.distanceMatrix(
    {
      origins: [origin],
      destinations: [destination],
      mode: 'driving',
      units: 'imperial',
    }).asPromise();
}
