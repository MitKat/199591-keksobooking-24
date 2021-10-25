/* eslint-disable eqeqeq */
//import {type} from '/js/utils/given-data.js';

//валидация заголовка объявления
const MIN_TITLE_LENGTH = 30;
const titleInput = document.querySelector('#title');

titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;

  if (valueLength > MIN_TITLE_LENGTH/4  && valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity (`Добавьте еще ${ MIN_TITLE_LENGTH - valueLength} симв.`);
  } else if (valueLength < MIN_TITLE_LENGTH/4 || valueLength > MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity ('');
  }

  titleInput.reportValidity();
});

//связываем тип жилья с placeholder цены

const  minPriceType = {
  palace : 10000,
  flat : 1000,
  hotel : 3000,
  house : 5000,
  bungalow : 0,
};
const typeOption = document.querySelector('#type');
const priceInput = document.querySelector('#price');

typeOption.addEventListener('change', (evt) => {
  priceInput.placeholder = minPriceType[evt.target.value];
});


//валидация цены за одну ночь
const MAX_PRICE_VALUE = 1000000;

priceInput.addEventListener('input', () => {
  const valuePrice = priceInput.value;

  if (valuePrice > MAX_PRICE_VALUE) {
    priceInput.setCustomValidity(`Максимальная цена за ночь =${MAX_PRICE_VALUE}`);
  } else {
    priceInput.setCustomValidity ('');
  }
});

//Синхронизация времени заезда и выезда
const optionTimeIn = document.querySelector('#timein');
const optionTimeOut = document.querySelector('#timeout');

optionTimeIn.addEventListener( 'change',  (evt) => {
  optionTimeOut.value =  evt.target.value;
});

optionTimeOut.addEventListener( 'change',  (evt) => {
  optionTimeIn.value =  evt.target.value;
});

// Навешиваем на форму обработчик отправки
const roomOption = document.querySelector('#room_number');
const capacityOption = document.querySelector('#capacity');

const form = document.querySelector('.ad-form');

const onValidityForm = (evt) => {
  //проверка цены в соответствии с типом жилья
  if (priceInput.value < minPriceType.flat) {
    if (typeOption.value === 'bungalow') {
      priceInput.setCustomValidity (' ');
    } else {
      evt.preventDefault();
      priceInput.setCustomValidity ('Цена для выбранного жилья должна быть выше');
    }
  }
  if (priceInput.value < minPriceType.hotel && priceInput.value >= minPriceType.flat) {
    if (typeOption.value === 'bungalow' || typeOption.value === 'flat') {
      priceInput.setCustomValidity (' ');
    } else {
      evt.preventDefault();
      priceInput.setCustomValidity ('Цена для выбранного жилья должна быть выше');
    }
  }
  if (priceInput.value < minPriceType.house && priceInput.value >= minPriceType.hotel) {
    if (typeOption.value === 'house' || typeOption.value === 'palace' ) {
      evt.preventDefault();
      priceInput.setCustomValidity ('Цена для выбранного жилья должна быть выше');
    } else {
      priceInput.setCustomValidity (' ');
    }
  }
  if (priceInput.value < minPriceType.palace) {
    if (typeOption.value === 'palace') {
      evt.preventDefault();
      priceInput.setCustomValidity ('Цена для выбранного жилья должна быть выше');
    } else {
      priceInput.setCustomValidity (' ');
    }
  }
  // priceInput.reportValidity();

  // //Синхронизация количество комнат с количеством гостей
  if (roomOption.value === 100 && capacityOption.value === 0) {
    capacityOption.setCustomValidity (' ');
  } else if (roomOption.value >= capacityOption.value && capacityOption.value!=0) {
    capacityOption.setCustomValidity (' ');
  } else {
    evt.preventDefault();
    capacityOption.setCustomValidity ('Количество гостей не должно быть меньше количества комнат');
  }
  // capacityOption.reportValidity();
};

form.addEventListener('submit', onValidityForm);


