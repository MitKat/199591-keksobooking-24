import {enableForms} from '/js/form-offer.js';
import {similarOffer} from '/js/popup.js';

const map = L.map('map-canvas')
  .on('load', () => {
    enableForms();
  })
  .setView({
    lat: 35.68950,
    lng: 139.69171,
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
    lat: 35.68950,
    lng: 139.69171,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainMarker.addTo(map);

const addressInput = document.querySelector('#address');
const FLOAT_POINT = 5;

mainMarker.on('moveend', (evt) => {
  const mainAnchor = evt.target.getLatLng();
  const mainAnchorLat = mainAnchor.lat.toFixed(FLOAT_POINT);
  const mainAnchorLng = mainAnchor.lng.toFixed(FLOAT_POINT);
  addressInput.value = `${mainAnchorLat}; ${mainAnchorLng}`;
});

//маркеры похижих объявлений
const markerGroup = L.layerGroup().addTo(map);

for (let i=0; i< similarOffer.length; i++) {
  const pinIcons = L.icon({
    iconUrl: '/img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  const markers = L.marker(
    {
      lat: similarOffer[i].location.lat,
      lng: similarOffer[i].location.lng,
    },
    {
      draggable: false,
      pinIcons,
    },
  );
  markers
    .addTo(markerGroup)
    .bindPopup(similarOffer[i]);
}
