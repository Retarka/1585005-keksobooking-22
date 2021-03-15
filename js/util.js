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

const ALERT_SHOW_TIME = 3000;

function openErrorDataPopup() {
  let errorPopup = document.createElement('div');
  errorPopup.style.height = '50px';
  errorPopup.style.textAlign = 'center';
  errorPopup.style.backgroundColor = '#ffaa99';
  errorPopup.style.position = 'fixed';
  errorPopup.style.padding = '10px';
  errorPopup.style.fontSize = '20px';
  errorPopup.style.top = 0;
  errorPopup.style.right = 0;
  errorPopup.style.left = 0;
  errorPopup.textContent = 'Ошибка загрузки данных с сервера';

  document.body.appendChild(errorPopup);

  setTimeout(() => {
    errorPopup.remove();
  }, ALERT_SHOW_TIME)
}

//СКЛОЕНИЕ СУЩЕСТВИТЕЛЬНЫХ ИСХОДЯ ИЗ ЧИСЛА

const getDeclensionOfNoun = (number, titles) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

//ПРОВЕРКА НАЛИЧИЯ ЗНАЧЕНИЙ ДЛЯ АТРИБУТА

const checkAttributeSrc = (cardAttribute, value) => {
  if (value) {
    cardAttribute.src = value;
  } else {
    cardAttribute.remove;
  }
};

//ПРОВЕРКА НАЛИЧИЯ ЗНАЧЕНИЙ ДЛЯ ПОКАЗА ИЛИ СКРЫТИЯ АТРИБУСА С ТЕКСТОМ КАРТОЧКИ

const checkAttributeTextContent = (cardAttribute, value, additionalString) => {
  if (value) {
    if (additionalString) {
      cardAttribute.textContent = value + additionalString;
    } else {
      cardAttribute.textContent = value;
    }
  } else {
    cardAttribute.remove();
  }
};

export {
  getRandomIntInclusive,
  getRandomReal,
  getRandomArrayElement,
  generateRandomArray,
  openErrorDataPopup,
  getDeclensionOfNoun,
  checkAttributeSrc,
  checkAttributeTextContent
};
