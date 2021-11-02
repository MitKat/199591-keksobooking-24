import {enableForms} from '/js/form-offer.js';
import {similarOffer} from '/js/generate-offer.js';
import {getPopupItem} from '/js/popup.js';

const LAT_TOKIO = 35.68950;
const LNG_TOKIO = 139.69171;
const addressInput = document.querySelector('#address');
const FLOAT_POINT = 5;
const setMainAddress = (lat, lng) => {
  addressInput.value = `${lat.toFixed(FLOAT_POINT)}; ${lng.toFixed(FLOAT_POINT)}`;
};

const map = L.map('map-canvas')
  .on('load', () => {
    enableForms();
    setMainAddress(LAT_TOKIO, LNG_TOKIO);
  })
  .setView({
    lat: LAT_TOKIO,
    lng: LNG_TOKIO,
  }, 9);

L.tileLayer(
  'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

//создаем главный маркер
const mainPinIcon = L.icon({
  iconUrl: '/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  {
    lat: LAT_TOKIO,
    lng: LNG_TOKIO,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  const mainAnchor = evt.target.getLatLng();
  setMainAddress(mainAnchor.lat, mainAnchor.lng);
});

//маркеры похижих объявлений
const markerGroup = L.layerGroup().addTo(map);

for (const item of similarOffer) {
  const icon = L.icon({
    iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  const marker = L.marker(
    item.location,
    {
      icon,
    },
  );

  marker
    .addTo(markerGroup)
    .bindPopup(getPopupItem(item));
}

