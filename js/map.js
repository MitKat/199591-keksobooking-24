import {StartPoint} from './utils/data.js';
import {enableFormOffer} from './form-offer.js';
import {getPopupItem} from './popup.js';

const WIDTH_MAIN_ICON = 52;
const HEIGHT_MAIN_ICON = 52;
const WIDTH_ICON = 40;
const HEIGHT_ICON = 40;
const WIDTH_MAIN_ANCHOR = 26;
const WIDTH_ANCHOR = 20;
const START_SCALE = 12;
const FLOAT_POINT = 5;
const addressInput = document.querySelector('#address');
const mainPinIcon = L.icon({
  iconUrl: '/img/main-pin.svg',
  iconSize: [WIDTH_MAIN_ICON, HEIGHT_MAIN_ICON],
  iconAnchor: [WIDTH_MAIN_ANCHOR, HEIGHT_MAIN_ICON],
});
const pinIcon = L.icon({
  iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
  iconSize: [WIDTH_ICON, HEIGHT_ICON],
  iconAnchor: [WIDTH_ANCHOR, HEIGHT_ICON],
});

const setMainAddress = ({lat, lng}) => {
  addressInput.value = `${lat.toFixed(FLOAT_POINT)}, ${lng.toFixed(FLOAT_POINT)}`;
};

const map = L.map('map-canvas')
  .on('load', () => {
    setMainAddress(StartPoint);
    enableFormOffer();
  })
  .setView(StartPoint, START_SCALE);

L.tileLayer(
  'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

//создаем главный маркер
const mainMarker = L.marker(
  StartPoint,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainMarker.addTo(map);

mainMarker.on('move', (evt) => {
  const mainAnchor = evt.target.getLatLng();
  setMainAddress(mainAnchor);
});

const markerGroup = L.layerGroup().addTo(map);

const getBalun = (offerArray) => {
  offerArray.forEach((offer) => {
    const marker = L.marker(
      offer.location,
      {
        icon: pinIcon,
      },
    );
    marker
      .addTo(markerGroup)
      .bindPopup(getPopupItem(offer));
  });
};

const resetMarker = () => {
  markerGroup.clearLayers();
};

const resetMainMarker = () => {
  mainMarker.setLatLng(StartPoint);
  setMainAddress(StartPoint);
  map.closePopup();
};

export {getBalun, resetMainMarker, resetMarker};
