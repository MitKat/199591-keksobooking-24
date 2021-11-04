
import './popup.js';
import {getData} from './utils/api.js';
import {showSuccessSent} from './success-sent.js';
import {showAlert, startPoint} from './utils/data.js';
import {setFormSubmit} from './form-offer.js';
import {getBalun, resetMarkerMap} from './map.js';

const SIMILAR_OFFER_COUNT = 10;

getData(
  (tender) => getBalun(tender.slice(0, SIMILAR_OFFER_COUNT)),
  () => showAlert('Ошибка на сервере. Подождите, мы уже решаем проблему.'),
);

//сброс формы в начальное состояние
const adForm = document.querySelector('.ad-form');
const btnReset = document.querySelector('.ad-form__reset');
// const btnSubmit = document.querySelector('.ad-form__submit');

const resetForm = (point) => {
  adForm.reset();
  resetMarkerMap(point);
};

btnReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm(startPoint);
});
// btnSubmit.addEventListener('click', () => {
//   resetForm(startPoint);
// });

setFormSubmit(showSuccessSent);
