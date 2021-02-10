function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

// [fractionalsign=1] = колличество знаков после запятой.

function getRandomReal(min, max, fractionalsign = 1) {
  const source = 10 ** fractionalsign;
  const minimum = min < 0 ? 0 : min * source;
  const maximum = max * source;

  return getRandomIntInclusive(minimum, maximum) / source;
}

const getRandomArrayElement = (elements) => {
  const randomArrayPointer = getRandomIntInclusive(0, elements.length - 1);
  return elements[randomArrayPointer];
};

const reshuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const generateRandomArray = (newArray) => {
  const randomArrayPointer = getRandomIntInclusive(0, newArray.length - 1);
  reshuffle(newArray);
  return newArray.slice(randomArrayPointer);
};

export {
  getRandomIntInclusive,
  getRandomReal,
  getRandomArrayElement,
  generateRandomArray
};
