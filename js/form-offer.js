//валидация заголовка объявления
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const titleInput = document.querySelector('#title');

titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity (`Ещё ${ MIN_TITLE_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity (`Слишком длинное название ${MAX_TITLE_LENGTH}`);
  } else {
    titleInput.setCustomValidity ('');
  }

  titleInput.reportValidity();
});

//валидация цены за одну ночь
const MAX_PRICE_VALUE = 1000000;

const priceInput = document.querySelector('#price');

priceInput.addEventListener('input', () => {
  const valuePrice = priceInput.value;


  if (valuePrice > MAX_PRICE_VALUE) {
    priceInput.setCustomValidity(`Очень дорого! ${MAX_PRICE_VALUE}`);

  } else {
    titleInput.setCustomValidity ('');
  }

  titleInput.reportValidity();
});

//Синхронизация количество комнат с количеством гостей
const roomOption = document.querySelector('#room_number');
const capacityOption = document.querySelector('#capacity');

