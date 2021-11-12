import {startPoint} from './utils/data.js';
import {enableForms} from './form-offer.js';
import {getPopupItem} from './popup.js';

const FLOAT_POINT = 5;
const addressInput = document.querySelector('#address');
const mainPinIcon = L.icon({
  iconUrl: '/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const pinIcon = L.icon({
  iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const setMainAddress = ({lat, lng}) => {
  addressInput.value = `${lat.toFixed(FLOAT_POINT)}; ${lng.toFixed(FLOAT_POINT)}`;
};

const map = L.map('map-canvas')
  .on('load', () => {
    setMainAddress(startPoint);
    enableForms();
  })
  .setView(startPoint, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

//создаем главный маркер
const mainMarker = L.marker(
  startPoint,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  const mainAnchor = evt.target.getLatLng();
  setMainAddress(mainAnchor);
});

const markerGroup = L.layerGroup().addTo(map);

const getBalun = (offerArray) => {
  for (const item of offerArray) {
    const marker = L.marker(
      item.location,
      {
        icon: pinIcon,
      },
    );
    marker
      .addTo(markerGroup)
      .bindPopup(getPopupItem(item));
  }
};

const resetMarker = () => {
  markerGroup.clearLayers();
};

const resetMainMarker = () => {
  mainMarker.setLatLng(startPoint);
  setMainAddress(startPoint);
  map.closePopup();
};

export {getBalun, resetMainMarker, resetMarker};
