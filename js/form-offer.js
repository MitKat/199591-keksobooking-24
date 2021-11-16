import {showErrorSent} from './message-sent-form.js';
import {sendData} from './utils/api.js';
import {resetPhotosForm} from './photo-add.js';

const MAX_ROOMS = 100;
const MIN_TITLE_LENGTH = 30;
const HALF_MIN_TITLE = MIN_TITLE_LENGTH/2;
const MAX_PRICE_VALUE = 1000000;
const  MinPriceType = {
  palace : 10000,
  flat : 1000,
  hotel : 3000,
  house : 5000,
  bungalow : 0,
};

const adForm = document.querySelector('.ad-form');
const elementsForm = adForm.children;
const mapFilters = document.querySelector('.map__filters');
const elementsMapFilters = mapFilters.children;
const titleInput = document.querySelector('#title');
const typeOption = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const optionTimeIn = document.querySelector('#timein');
const optionTimeOut = document.querySelector('#timeout');
const roomOption = document.querySelector('#room_number');
const capacityOption = document.querySelector('#capacity');
const resetButton = adForm.querySelector('.ad-form__reset');


const disableElementsForm = (elements) => {
  for (let i=0; i<elements.length; i++) {
    elements[i].disabled = true;
  }
};

const enableElementsForm = (elements) => {
  for (let i=0; i<elements.length; i++) {
    elements[i].disabled = false;
  }
};
//форма в неактивном состоянии
const disableForms = () => {
  adForm.classList.add('ad-form--disabled');
  disableElementsForm(elementsForm);

  mapFilters.classList.add('map__filters--disabled');
  disableElementsForm(elementsMapFilters);
};
disableForms();

//форма в активном состоянии
const enableFormOffer = () => {
  adForm.classList.remove('ad-form--disabled');
  enableElementsForm(elementsForm);
};
const enableFormFilters = () => {
  mapFilters.classList.remove('map__filters--disabled');
  enableElementsForm(elementsMapFilters);
};
//валидация заголовка объявления
titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;

  titleInput.setCustomValidity ('');
  if (valueLength > HALF_MIN_TITLE  && valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity (`Добавьте еще ${ MIN_TITLE_LENGTH - valueLength} симв.`);
  }
  titleInput.reportValidity();
});

//валидация типа жилья и цены
const validatePrice = () => {
  const currentPrice = parseInt(priceInput.value, 10);
  const minPrice = MinPriceType[typeOption.value];

  priceInput.setCustomValidity ('');
  //валидация минимальной цены за ночь
  if (currentPrice < minPrice) {
    priceInput.setCustomValidity (`Минимальная цена выбранного типа жилья - ${minPrice}`);
  }
  //валидация максимальной цены за ночь
  if (currentPrice > MAX_PRICE_VALUE) {
    priceInput.setCustomValidity(`Максимальная цена за ночь - ${MAX_PRICE_VALUE}`);
  }

  priceInput.reportValidity();
};

typeOption.addEventListener('change', (evt) => {
  priceInput.placeholder = MinPriceType[evt.target.value];
  validatePrice();
});

priceInput.addEventListener('input', () => {
  validatePrice();
});

//Синхронизация времени заезда и выезда
optionTimeIn.addEventListener( 'change',  (evt) => {
  optionTimeOut.value =  evt.target.value;
});

optionTimeOut.addEventListener( 'change',  (evt) => {
  optionTimeIn.value =  evt.target.value;
});

//Синхронизация количество комнат с количеством гостей
const onChangeRoomCapacity = () => {
  const valueCapacity = parseInt(capacityOption.value, 10);
  const valueRooms = parseInt(roomOption.value, 10);
  capacityOption.setCustomValidity ('');

  if (valueRooms < valueCapacity || valueCapacity === 0 || valueRooms === MAX_ROOMS) {
    capacityOption.setCustomValidity ('Количество гостей не должно быть больше количества комнат');
    if(valueRooms===MAX_ROOMS && valueCapacity === 0) {
      capacityOption.setCustomValidity ('');
    }
  }
  capacityOption.reportValidity();
};
capacityOption.addEventListener('change', onChangeRoomCapacity);
roomOption.addEventListener('change', onChangeRoomCapacity);

//сброс формы в начальное состояние
const resetForm = () => {
  resetPhotosForm();
  adForm.reset();
  priceInput.placeholder = MinPriceType[typeOption.value];
};

const setOnFormReset = (callback)=>{
  resetButton.addEventListener('click', (evt)=>{
    evt.preventDefault();
    resetForm();
    callback();
  });
};

//отправка формы на сервер
const setFormSubmit = (onSuccess, onResetMarker) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => {
        onSuccess();
        resetForm();
        onResetMarker();
      },
      () => showErrorSent(),
      new FormData(evt.target),
    );

  });
};

export {enableFormOffer, enableFormFilters, setFormSubmit, setOnFormReset};
