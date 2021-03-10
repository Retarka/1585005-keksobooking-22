import './data.js';
import './util.js';
import './map.js';
import './card.js';
import './form.js';
import './filter.js';
import './popup.js';
import { getData } from './api.js';
import { renderOnMap } from './map.js';
import { setFilterReset, setFilterChange } from './filter.js';


const RERENDER_DELAY = 500;

getData((nearbyPlacesCard) => {
  renderOnMap(nearbyPlacesCard);
  setFilterReset(() => renderOnMap(nearbyPlacesCard));
  setFilterChange(_.debounce(() => renderOnMap(nearbyPlacesCard), RERENDER_DELAY));
});
