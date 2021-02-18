const housingInformation = {
  bungalow: {
    type: 'Бунгало',
    price: 0,
  },

  flat: {
    type: 'Квартира',
    price: 1000,
  },

  house: {
    type: 'Дом',
    price: 5000,
  },

  palace: {
    type: 'Дворец',
    price: 10000,
  },
};

const advertisement = document.querySelector('.ad-form');
const type = advertisement.querySelector('#type');
const price = advertisement.querySelector('#price');
const timeArrival = advertisement.querySelector('#timein');
const timeLeave = advertisement.querySelector('#timeout');

const validatePrice = () => {
  type.addEventListener('change', () => {
    price.placeholder = housingInformation[type.value].price;
    price.min = housingInformation[type.value].price;
  });
};

const validateTime = () => {
  timeArrival.addEventListener('change', () => timeLeave.value = timeArrival.value);
  timeLeave.addEventListener('change', () => timeArrival.value = timeLeave.value);
}


validateTime();
validatePrice();
