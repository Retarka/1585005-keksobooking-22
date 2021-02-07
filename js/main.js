const OBJECTS = 10;

const PRICE_MINIMUM = 1700000;

const PRICE_MAXIMUM = 170000000;

const GUESTS_MAXIMUM = 10;

const ROOMS_MAXIMUM = 5;

const X_MINIMUM = 35.65000;

const X_MAXIMUM= 35.70000;

const Y_MINIMUM= 139.70000;

const Y_MAXIMUM = 139.80000;

const FRACTIONALSIGN_X_Y = 1;

const TIMES = [
  '12:00',
  '13:00',
  '14:00',
];


const OBJECT_PLACES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];


const SERVICES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];


const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];


const DESCRIPTION_OF_OBJECTS = [
  'Дворец, почти как в Геленджике',
  'Квартира с бабушкиным ремонтом',
  'Домик в деревне',
  'Бунгало прямо на Малидивах, честно',
  'Место силы',
  'Квартира, в которой живут мыши',
  'Убежище от людей',
  'Бунгало для настоящих любителей одиночества',
  'Однушка в Химках, но зато не в кредит',
  'Место для сумасшедших тусовок',
];


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

const generateAutor = () => {
  return {
    avatar: 'img/avatars/user0' + getRandomIntInclusive(1, 8) + '.png',
  };
}

const generateOffer = (newLocation) => {
  return {
    title: 'Вы не сможете устоять, увидев наши условия!',
    address: newLocation.x + ', ' + newLocation.y,
    price: getRandomIntInclusive(PRICE_MINIMUM, PRICE_MAXIMUM),
    type: getRandomArrayElement(OBJECT_PLACES),
    rooms: getRandomIntInclusive(0, ROOMS_MAXIMUM),
    guests: getRandomIntInclusive(0, GUESTS_MAXIMUM),
    checkin: getRandomArrayElement(TIMES),
    checkout: getRandomArrayElement(TIMES),
    features: generateRandomArray(SERVICES),
    description: getRandomArrayElement(DESCRIPTION_OF_OBJECTS),
    photos: generateRandomArray(PHOTOS),
  };
}

const generateLocation = () => {
  return {
    x: getRandomReal(X_MINIMUM, X_MAXIMUM, FRACTIONALSIGN_X_Y),
    y: getRandomReal(Y_MINIMUM, Y_MAXIMUM, FRACTIONALSIGN_X_Y),
  };
}

const generateNearbyPlace = () => {
  const newLocation = generateLocation();
  return {
    author: generateAutor(),
    location: newLocation,
    offrer: generateOffer(newLocation),
  };
};

const generateNearbyPlaces = () => {
  return new Array(OBJECTS).fill(null).map(() => generateNearbyPlace());
}

generateNearbyPlaces();
