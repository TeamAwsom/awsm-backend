const googleMapsClient = require('@google/maps').createClient({
  key: process.env.MAPS_KEY,
});

const mapsAPI = module.exports;

mapsAPI.getDistanceMatrix = async (origin, destination) => {
  const res = await googleMapsClient.distanceMatrix(
    {
      origins: [origin],
      destinations: [destination],
      mode: 'driving',
      units: 'imperial',
    },
    (response, status) => {
      console.log(status.json.rows[0].elements[0]);
    }
  );
};
