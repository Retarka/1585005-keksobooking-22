import { activateForm, address } from './form.js';
import { renderCard } from './card.js';
import { ArrayNumber } from './data.js';
import { activateFilter, filterAnnouncements } from './filter.js';

/* global L:readonly */

const INITIAL_COORDINATES = {
  lat: '35.68951',
  lng: '139.69201',
};

const ZOOM = 12;

const getMainAddress = () => {
  address.value = `${INITIAL_COORDINATES.lat}, ${INITIAL_COORDINATES.lng}`;
};

const map = L.map('map-canvas')
  .on('load', () => {
    activateFilter();
    activateForm();
    getMainAddress();
  })
  .setView(INITIAL_COORDINATES, ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

//Маркер

const MAIN_PIN_WIDTH = 52;

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [MAIN_PIN_WIDTH, MAIN_PIN_WIDTH],
  iconAnchor: [MAIN_PIN_WIDTH / 2, MAIN_PIN_WIDTH],
});

const mainPinMarker = L.marker(
  {
    lat: INITIAL_COORDINATES.lat,
    lng: INITIAL_COORDINATES.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
).addTo(map);

mainPinMarker.on('moveend', (evt) => {
  address.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

//КОМАНДА СБРОСА

const resetMarkerAndAddress = () => {
  map.setView(INITIAL_COORDINATES, ZOOM);
  map.closePopup();
  mainPinMarker.setLatLng(INITIAL_COORDINATES);
  getMainAddress();
};


//Дополнительная метка

const ponyPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [MAIN_PIN_WIDTH, MAIN_PIN_WIDTH],
  iconAnchor: [MAIN_PIN_WIDTH / 2, MAIN_PIN_WIDTH],
});

let ponyPins = [];

const renderOnMap = (similarAnnouncements) => {
  ponyPins.forEach((pin) => pin.remove());

  similarAnnouncements
    .slice()
    .filter(filterAnnouncements)
    .slice(0, ArrayNumber)
    .forEach((announcement) => {
      const { location } = announcement;

      const ponyPin = L.marker(
        {
          lat: location.lat,
          lng: location.lng,
        },
        {
          icon: ponyPinIcon,
        },
      );

      ponyPin
        .addTo(map)
        .bindPopup(renderCard(announcement));

      ponyPins.push(ponyPin);
    });
};

export { renderOnMap, resetMarkerAndAddress };
