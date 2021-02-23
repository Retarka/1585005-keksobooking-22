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
const address = advertisement.querySelector('#address');
const fieldsets = advertisement.querySelectorAll('fieldset');
const price = advertisement.querySelector('#price');
const timeArrival = advertisement.querySelector('#timein');
const timeLeave = advertisement.querySelector('#timeout');

//Неактивное состояние

const disableForm = () => {
  advertisement.classList.add('ad-form--disabled');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = true;
  });
};

//Активное состояние

const activateForm = () => {
  advertisement.classList.remove('ad-form--disabled');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });
};

disableForm();

address.readOnly = true;

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

export { activateForm, address };
