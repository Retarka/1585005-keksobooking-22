const FieldLimit = {
  MIN_TITLE_LENGTH: 30,
  MAX_TITLE_LENGTH: 100,
  MAXIMUM_PRICE: 1000000,
};

const ROOMS_TONNAGE = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

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
const title = advertisement.querySelector('#title');
const address = advertisement.querySelector('#address');
const room = advertisement.querySelector('#room_number');
const capacity = advertisement.querySelector('#capacity');
const fieldsets = advertisement.querySelectorAll('fieldset');
const price = advertisement.querySelector('#price');
const timeArrival = advertisement.querySelector('#timein');
const timeLeave = advertisement.querySelector('#timeout');

//НЕАКТИВНОЕ СОСТОЯНИЕ

const disableForm = () => {
  advertisement.classList.add('ad-form--disabled');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = true;
  });
};

//АКТИВНОЕ СОСТОЯНИЕ

const activateForm = () => {
  advertisement.classList.remove('ad-form--disabled');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });
};

disableForm();

//АДРЕСС

address.readOnly = true;

//ВАЛИДАЦИЯ ЗАГОЛОВКА

title.addEventListener('input', () => {
  const valueLength = title.value.length;

  if (valueLength < FieldLimit.MIN_TITLE_LENGTH) {
    title.setCustomValidity(`Ещё ${FieldLimit.MIN_TITLE_LENGTH - valueLength} симв.`);
  } else if (valueLength > FieldLimit.MAX_TITLE_LENGTH) {
    title.setCustomValidity(`Удалите лишние ${valueLength - FieldLimit.MAX_TITLE_LENGTH} симв.`)
  } else {
    title.setCustomValidity('');
  }

  title.reportValidity();
});

//ВАЛИДАЦИЯ ЦЕН

price.addEventListener('input', () => {
  const valueLength = price.value.length;

  if (valueLength > FieldLimit.MAX_PRICE) {
    price.setCustomValidity(`Цена не должна превышать ${FieldLimit.MAX_PRICE}`)
  } else {
    price.setCustomValidity('');
  }

  price.reportValidity();
});

//ВЫБОР ВРЕМЕНИ

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

//ВАЛИДАЦИЯ КОЛИЧЕСТВА ГОСТЕЙ И КОМНАТ

const getRoomTonnage = () => {
  for (let option of capacity.options) {
    option.disabled = !ROOMS_TONNAGE[room.value].includes(option.value);
  }
  capacity.value = ROOMS_TONNAGE[room.value].includes(capacity.value) ? capacity.value : ROOMS_TONNAGE[room.value][0];
};

getRoomTonnage();

room.addEventListener('change', () => {
  getRoomTonnage();
});


export { activateForm, address };
