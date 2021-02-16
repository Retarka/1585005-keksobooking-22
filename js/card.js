import {nearbyPlacesCard} from './data.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const mapCanvas = document.querySelector('#map-canvas');

const renderCard = (offerItem) => {

  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('img').src = offerItem.author.avatar;
  cardElement.querySelector('.popup__title').textContent = offerItem.offer.title;
  cardElement.querySelector('.popup__text--address').innerHTML = offerItem.offer.address;
  cardElement.querySelector('.popup__text--price').innerHTML = `${offerItem.offer.price} ₽/ночь`;

  const getTypePlace = (offerItem) => {
    switch (offerItem.offer.type) {
      case 'bungalow': return 'Бунгало';
      case 'flat': return 'Квартира';
      case 'house': return 'Дом';
      case 'palace': return 'Дворец';
    }
  }

  cardElement.querySelector('.popup__type').textContent = getTypePlace(offerItem.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = `${offerItem.offer.rooms} комнаты для ${offerItem.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offerItem.offer.checkin}, выезд до ${offerItem.offer.checkout}`;

  const possibleFeaturesList = cardElement.querySelector('.popup__features');

  const featuresList = offerItem.offer.features;

  possibleFeaturesList.innerHTML = '';
  for (let i = 0; i < featuresList.length; i++) {
    const element = `<li class="popup__feature popup__feature--${featuresList[i]}"></li>`;
    possibleFeaturesList.insertAdjacentHTML('beforeend', element);
  }

  cardElement.querySelector('.popup__description').textContent = offerItem.offer.description;

  const photoGallery = cardElement.querySelector('.popup__photos');

  const photosList = offerItem.offer.photos;
  photoGallery.innerHTML = '';
  for (let i = 0; i < photosList.length; i++) {
    const element = `<img src="${photosList[i]}" class="popup__photo" width="45" height="40" alt="Фотография жилья"></img>`;
    photoGallery.insertAdjacentHTML('beforeend', element);
  }
  return cardElement;
};

mapCanvas.appendChild(renderCard(nearbyPlacesCard[0]));
