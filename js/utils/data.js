const RenderType = {
  palace: 'Дворец',
  bungalow: 'Бунгало',
  flat: 'Квартира',
  house: 'Дом',
  hotel: 'Отель',
};
const SIMILAR_OFFER_COUNT = 10;
const ALERT_SHOW_TIME = 5000;
const LAT_TOKIO = 35.68950;
const LNG_TOKIO = 139.69171;

const StartPoint = {
  lat: LAT_TOKIO,
  lng: LNG_TOKIO,
};

const NAME_KEY_ESCAPE = 'Escape';

const isEscapeKey = (evt) => evt.key === NAME_KEY_ESCAPE;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 700;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = '160px';
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'grey';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {RenderType, SIMILAR_OFFER_COUNT, isEscapeKey, StartPoint, showAlert};
