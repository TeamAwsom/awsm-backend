module.exports = object => {
  const { addressOne, addressTwo, city, state, zip } = object;
  if (addressTwo) {
    return `${addressOne}, ${addressTwo}, ${city}, ${state} ${zip}`;
  }
  return `${addressOne}, ${city}, ${state} ${zip}`;
};
