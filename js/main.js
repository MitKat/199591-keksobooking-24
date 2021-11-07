
import './popup.js';
import './form-fiters.js';
import {getData} from './utils/api.js';
import {showSuccessSent} from './message-sent-form.js';
import {showAlert} from './utils/data.js';
import {setFormSubmit, setOnFormReset} from './form-offer.js';
import {getBalun, resetMainMarker, resetMarker} from './map.js';

const filterElement = {
  rooms: 0,
  type: '',
  price: '',
};

const filtersContainer = document.querySelector('.map__filters');

const filtersType = filtersContainer.querySelector('#housing-type');
const filtersPrice = filtersContainer.querySelector('#housing-price');
const filtersRooms = filtersContainer.querySelector('#housing-rooms');

const setTypeChange = (callback) => {
  filtersType.addEventListener('change', (evt) => {
    filterElement.type = evt.target.value;
    callback();
  });
};

const setPriceChange = (callback) => {
  filtersPrice.addEventListener('change', (evt) => {
    filterElement.price = evt.target.value;
    callback();
  });
};

const setRoomsChange = (callback) => {
  filtersRooms.addEventListener('change', (evt) => {
    filterElement.rooms = Number(evt.target.value);
    callback();
  });
};

const funcType = (offer) => {
  let rank = 0;

  if (offer.offer.type === filterElement.type) {
    rank += 3;
  }

  let rangePrice = '';
  const price  = Number(offer.offer.price);

  if (price <= 10000) {
    rangePrice = 'low';
  } else if (price > 10000 && price < 50000) {
    rangePrice = 'middle';
  } else {
    rangePrice = 'high';
  }

  if (rangePrice === filterElement.price) {
    rank += 2;
  }

  if (offer.offer.rooms === filterElement.rooms) {
    rank += 1;
  }

  return rank;
};

const compareOffers = (offerA, offerB) => {
  const rankA = funcType(offerA);
  const rankB = funcType(offerB);
  return rankB - rankA;
};

const SIMILAR_OFFER_COUNT = 10;

getData(
  (offers) => {
    getBalun(offers.slice(0, SIMILAR_OFFER_COUNT));
    setTypeChange(() => {
      resetMarker();
      getBalun(
        offers
          .slice()
          .sort(compareOffers)
          .slice(0, SIMILAR_OFFER_COUNT),
      );
    });
    setPriceChange(() => {
      resetMarker();
      getBalun(
        offers
          .slice()
          .sort(compareOffers)
          .slice(0, SIMILAR_OFFER_COUNT),
      );
    });
    setRoomsChange(() => {
      resetMarker();
      getBalun(
        offers
          .slice()
          .sort(compareOffers)
          .slice(0, SIMILAR_OFFER_COUNT),
      );
    });

  },
  () => showAlert('Ошибка на сервере. Подождите, мы уже решаем проблему.'),
);

//отправка формы
setFormSubmit(showSuccessSent, resetMainMarker);

//очистить форму
setOnFormReset(resetMainMarker);
