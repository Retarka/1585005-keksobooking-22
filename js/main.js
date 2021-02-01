// eslint-disable-next-line no-unused-vars
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}


// [fractionalsign=1] = колличество знаков после запятой.

// eslint-disable-next-line no-unused-vars
function getRandomReal(min, max, fractionalsign = 1) {
  const source = 10 ** fractionalsign;
  const minimum = min < 0 ? 0 : min * source;
  const maximum = max * source;
  // eslint-disable-next-line no-unused-vars
  return getRandomIntInclusive(minimum, maximum) / source;
}



