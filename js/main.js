import './popup.js';
import './photo-add.js';
import './form-fiters.js';
import {getData} from './utils/api.js';
import {showSuccessSent} from './message-sent-form.js';
import {showAlert, SIMILAR_OFFER_COUNT} from './utils/data.js';
import {setFormSubmit, setOnFormReset} from './form-offer.js';
import {getBalun, resetMainMarker, resetMarker} from './map.js';
import {setFilterOffers, renderOffer} from './form-fiters.js';
import {debounce} from './utils/debounce.js';

getData(
  (offers) => {
    getBalun(offers.slice(0, SIMILAR_OFFER_COUNT));
    setFilterOffers(debounce(
      () => {
        resetMarker();
        renderOffer(offers);
      }));
  },
  () => showAlert('Ошибка на сервере. Подождите, мы уже решаем проблему.'),
);

//отправка формы
setFormSubmit(showSuccessSent, resetMainMarker);

//очистить форму
setOnFormReset(resetMainMarker);
