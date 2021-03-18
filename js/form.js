import { filter } from './filter.js';
import { sendData } from './api.js';
import { openErrorPopup, openSuccessPopup } from './popup.js';
import { resetMarkerAndAddress } from './map.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;


const ROOMS_TONNAGE = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const getHousingPrice = {
  palace: {
    type: 'Дворец',
    price: 10000,
  },

  house: {
    type: 'Дом',
    price: 5000,
  },

  flat: {
    type: 'Квартира',
    price: 1000,
  },

  bungalow: {
    type: 'Бунгало',
    price: 0,
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
const resetButton = advertisement.querySelector('.ad-form__reset');

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
  const getTitleError = (valueLength) => {
    if (valueLength < MIN_TITLE_LENGTH) {
      return `Ещё ${(MIN_TITLE_LENGTH - valueLength)} симв.`;
    }
    if (valueLength > MAX_TITLE_LENGTH) {
      return `Удалите лишние ${(valueLength - MAX_TITLE_LENGTH)} симв.`;
    }
    return '';
  }

  title.addEventListener('input', (evt) => {
    const element = evt.target;
    const errorMessage = getTitleError(element.value.length);
    element.setCustomValidity(errorMessage);
    element.reportValidity();
  });
});

//ВАЛИДАЦИЯ ЦЕН



price.addEventListener('input', () => {
  const minPrice = getHousingPrice(type.value);

  if (price.validity.valueMissing) {
    price.setCustomValidity('Это поле обязательно для заполнения');
  } else if (price.value < minPrice) {
    price.setCustomValidity(`Стоимость должна быть не менее ${minPrice}`);
  } else {
    price.setCustomValidity('');
  }

  price.reportValidity();
});



const validatePrice = () => {
  type.addEventListener('change', () => {
    price.placeholder = getHousingPrice[type.value].price;
    price.min = getHousingPrice[type.value].price;
  });
};


//ВЫБОР ВРЕМЕНИ

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

//ОТМЕНА ПЕРЕХОДА НА НОВУЮ СТРАНИЦУ

const resetForm = (successBanner) => {
  advertisement.reset();
  filter.reset();
  resetMarkerAndAddress();
  getRoomTonnage();

  if (successBanner) {
    openSuccessPopup();
  }
};

const setUserFormSubmit = (onSuccess) => {
  advertisement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(true),
      () => openErrorPopup(),
      new FormData(evt.target),
    );
  });
}

setUserFormSubmit(resetForm);


resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm(false)
});

export { activateForm, address };
