import './data.js';
import './util.js';
import './map.js';
import './card.js';
import './form.js';
import './filter.js';
import './popup.js';
import { getData } from './api.js';
import { renderCard } from './card.js';

getData((nearbyPlacesCard) => {
  renderCard(nearbyPlacesCard);
});
