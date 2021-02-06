// // eslint-disable-next-line no-unused-vars
// function getRandomIntInclusive(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
// }


// // [fractionalsign=1] = колличество знаков после запятой.

// // eslint-disable-next-line no-unused-vars
// function getRandomReal(min, max, fractionalsign = 1) {
//   const source = 10 ** fractionalsign;
//   const minimum = min < 0 ? 0 : min * source;
//   const maximum = max * source;
//   // eslint-disable-next-line no-unused-vars
//   return getRandomIntInclusive(minimum, maximum) / source;
// }


// eslint-disable-next-line no-unused-vars
const object = 4;
// eslint-disable-next-line no-unused-vars
const price_minimum = 1700000;
// eslint-disable-next-line no-unused-vars
const price_maximum = 170000000;
// eslint-disable-next-line no-unused-vars
const guest_maximum = 10;
// eslint-disable-next-line no-unused-vars
const rooms_maximum = 5;
// eslint-disable-next-line no-unused-vars
const x_minimum = 35.65000;
// eslint-disable-next-line no-unused-vars
const x_maximum= 35.70000;
// eslint-disable-next-line no-unused-vars
const y_minimum= 139.70000;
// eslint-disable-next-line no-unused-vars
const y_maximum = 139.80000;
// eslint-disable-next-line no-unused-vars
const fractionalsign_x_y = 1;

// eslint-disable-next-line no-unused-vars
const time = [
  '12:00',
  '13:00',
  '14:00',
];

// eslint-disable-next-line no-unused-vars
const object_place = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

// eslint-disable-next-line no-unused-vars
const services = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

// eslint-disable-next-line no-unused-vars
const photo = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

// eslint-disable-next-line no-unused-vars
const description_of_objects = [
  'Дворец почти как в Геленджике',
  'Квартира с бабушкиным ремонтом',
  'Домик в деревне',
  'Бунгало прямо на Малидивах, честно',
];

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

// eslint-disable-next-line no-unused-vars
const getRandomMassifElement = (elements) => {
  return elements[getRandomIntInclusive(0, elements.length - 1)];
};

// eslint-disable-next-line no-unused-vars
const getRandomLongForMassif = (length) => {
  return getRandomIntInclusive(0, length);
}

// eslint-disable-next-line no-unused-vars
const getCreateRandomMassif = (elements) => {
  const newMassifLong = getRandomLongForMassif(elements.length);
  let tempMassif = [];
  if (newMassifLong === 0) {
    return tempMassif;
  }

  tempMassif[0] = getRandomIntInclusive(0, elements.length - 1);
  if (newMassifLong !== 1) {
    for (let i = 1; i < newMassifLong; i++) {
      let newish;
      do {
        newish = true;
        let randomNumber = getRandomIntInclusive(0, elements.length - 1);
        for (let j = 0; j < i; j++) {
          if (randomNumber === tempMassif[j]) {
            newish = false;
          }
        }
        if (newish === true) {
          tempMassif[i] = randomNumber;
        }
      }
      while (newish === false)
    }
  }

  const newMassif = tempMassif.map((newMas) => {
    return elements[newMas];
  });

  return newMassif;
}

// eslint-disable-next-line no-unused-vars
const getCreateAutor = () => {
  return {
    avatar: 'img/avatars/user0' + getRandomIntInclusive(1, 8) + '.png',
  };
}

// eslint-disable-next-line no-unused-vars
const getCreateOffer = (newLocation) => {
  return {
    title: 'Вы не сможете устоять, увидев наши условия!',
    address: newLocation.x + ', ' + newLocation.y,
    price: getRandomIntInclusive(price_minimum, price_maximum),
    type: getRandomMassifElement(object_place),
    rooms: getRandomIntInclusive(0, rooms_maximum),
    guests: getRandomIntInclusive(0, guest_maximum),
    checkin: getRandomMassifElement(time),
    checkout: getRandomMassifElement(time),
    features: getCreateRandomMassif(services),
    description: getRandomMassifElement(description_of_objects),
    photos: getCreateRandomMassif(photo),
  };
}

const getCreateLocation = () => {
  return {
    x: getRandomReal(x_minimum, x_maximum, fractionalsign_x_y),
    y: getRandomReal(y_minimum, y_minimum, fractionalsign_x_y),
  };
}

const getCreateNearbyPlace = () => {
  const newLocation = getCreateLocation();
  return {
    author: getCreateAutor(),
    location: newLocation,
    offrer: getCreateOffer(newLocation),
  };
};

// eslint-disable-next-line no-unused-vars
const getCreateNearbyPlaces = () => {
  return new Array(object).fill(null).map(() => getCreateNearbyPlace());
}

getCreateNearbyPlace();
