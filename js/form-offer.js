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

priceInput.addEventListener('input', (evt) => {
  const valuePrice = priceInput.value;

  if (valuePrice > MAX_PRICE_VALUE) {
    priceInput.setCustomValidity(`Максимальная цена за ночь =${MAX_PRICE_VALUE}`);
  } else {
    priceInput.setCustomValidity ('');
  }

  //валидация по минимальной цене
  if (valuePrice < minPriceType.palace) {
    priceInput.setCustomValidity ('');
    if (typeOption.value === 'palace') {
      evt.preventDefault();
      priceInput.setCustomValidity (`Минимальная цена дворца = ${minPriceType.palace}`);
    }
    if (valuePrice < minPriceType.house) {
      if (typeOption.value === 'house') {
        evt.preventDefault();
        priceInput.setCustomValidity (`Минимальная цена дома = ${minPriceType.house}`);
      } else if (valuePrice < minPriceType.hotel) {
        if (valuePrice === 'hotel') {
          evt.preventDefault();
          priceInput.setCustomValidity (`Минимальная цена отеля = ${minPriceType.hotel}`);
        } else if (valuePrice < minPriceType.flat) {
          if (typeOption.value === 'flat') {
            evt.preventDefault();
            priceInput.setCustomValidity (`Минимальная цена квартиры = ${minPriceType.flat}`);
          } else {
            priceInput.setCustomValidity ('');
          }
        }
      }
    }
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

//Синхронизация количество комнат с количеством гостей
const roomOption = document.querySelector('#room_number');
const capacityOption = document.querySelector('#capacity');

const onCapacityChange = (evt) => {
  capacityOption.setCustomValidity (' ');

  if (roomOption.value < capacityOption.value) {
    evt.preventDefault();
    capacityOption.setCustomValidity ('Количество гостей не должно быть больше количества комнат');
  } else {
    capacityOption.setCustomValidity (' ');
  }
  if (roomOption.value === 100 && capacityOption.value===0) {
    capacityOption.setCustomValidity (' ');
  }
  // capacityOption.reportValidity();
};

capacityOption.addEventListener('change', onCapacityChange);

const form = document.querySelector('.ad-form');

form.addEventListener('submit', (evt) => {

  const btn = evt.target.elements['submit-btn'];

  btn.disabled = true;
});
