import {nearbyPlacesCard} from './data.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const renderCard = ({author, offer}) => {

  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('img').src = author.avatar;
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').innerHTML = offer.address;
  cardElement.querySelector('.popup__text--price').innerHTML = `${offer.price} ₽/ночь`;

  const getTypePlace = (offer) => {
    switch (offer.offer.type) {
      case 'bungalow': return 'Бунгало';
      case 'flat': return 'Квартира';
      case 'house': return 'Дом';
      case 'palace': return 'Дворец';
    }
  }

  cardElement.querySelector('.popup__type').textContent = getTypePlace[offer.type];

  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  const possibleFeaturesList = cardElement.querySelector('.popup__features');
  const featuresList = offer.offer.features;
  possibleFeaturesList.innerHTML = '';
  for (let i = 0; i < featuresList.length; i++) {
    const element = `<li class="popup__feature popup__feature--${featuresList[i]}"></li>`;
    possibleFeaturesList.insertAdjacentHTML('beforeend', element);
  }

  cardElement.querySelector('.popup__description').textContent = offer.offer.description;

  const photoGallery = cardElement.querySelector('.popup__photos');
  const photosList = offer.offer.photos;
  photoGallery.innerHTML = '';
  for (let i = 0; i < photosList.length; i++) {
    const element = `<img src="${photosList[i]}" class="popup__photo" width="45" height="40" alt="Фотография жилья"></img>`;
    photoGallery.insertAdjacentHTML('beforeend', element);
  }
  return cardElement;
};

const renderCards = nearbyPlacesCard.map(renderCard);
const renderCardsFragment = document.createDocumentFragment();
renderCardsFragment.appendChild(renderCards[0]);

export {nearbyPlacesCard, renderCard};



