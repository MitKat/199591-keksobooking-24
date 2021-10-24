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
    priceInput.setCustomValidity(`Очень дорого! max=${MAX_PRICE_VALUE}`);
  } else {
    priceInput.setCustomValidity ('');
  }
  priceInput.reportValidity();
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
form.onsubmit = function(evt) {

  //проверка цены в соответствии с типом жилья
  if (priceInput.value <= 999) {
    if (typeOption.value == 'bungalow') {
      priceInput.reportValidity();
    } else {
      evt.preventDefault();
      priceInput.setCustomValidity ('Сделайте цену выше!');
    }
  }
  if (priceInput.value <= 2999 && priceInput.value > 999) {
    if (typeOption.value == 'bungalow' || typeOption.value == 'flat') {
      priceInput.reportValidity();
    } else {
      evt.preventDefault();
      priceInput.setCustomValidity ('Сделайте цену выше!');
    }
  }
  if (priceInput.value <= 4999 && priceInput.value > 2999) {
    if (typeOption.value == 'house' || typeOption.value == 'palace' ) {
      evt.preventDefault();
      priceInput.setCustomValidity ('Сделайте цену выше!');
    } else {
      priceInput.reportValidity();
    }
  }
  if (priceInput.value <= 9999) {
    if (typeOption.value == 'palace') {
      evt.preventDefault();
      priceInput.setCustomValidity ('Сделайте цену выше!');
    } else {
      priceInput.reportValidity();
    }
  }

  // //Синхронизация количество комнат с количеством гостей
  if (roomOption.value == 100 && capacityOption.value == 0) {
    capacityOption.reportValidity();

  } else if (roomOption.value == 1 && capacityOption.value == 1) {
    capacityOption.reportValidity();
  } else if (roomOption.value == 2  && (capacityOption.value == 2 || capacityOption.value == 1)) {
    capacityOption.reportValidity();
  } else  if (roomOption.value == 3  && (capacityOption.value == 3 || capacityOption.value == 2 ||  capacityOption.value == 1)){
    capacityOption.reportValidity();
  } else {
    evt.preventDefault();
    capacityOption.setCustomValidity ('Проверьте тип жилья');
  }


};


