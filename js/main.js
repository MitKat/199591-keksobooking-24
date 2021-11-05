
import './popup.js';
import {getData} from './utils/api.js';
import {showSuccessSent} from './message-sent-form.js';
import {showAlert} from './utils/data.js';
import {setFormSubmit, setOnFormReset} from './form-offer.js';
import {getBalun, resetMainMarker} from './map.js';

const SIMILAR_OFFER_COUNT = 10;

getData(
  (offers) => getBalun(offers.slice(0, SIMILAR_OFFER_COUNT)),
  () => showAlert('Ошибка на сервере. Подождите, мы уже решаем проблему.'),
);

//отправка формы
setFormSubmit(showSuccessSent, resetMainMarker);

//очистить форму
setOnFormReset(resetMainMarker);
