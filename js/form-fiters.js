import {SIMILAR_OFFER_COUNT} from './utils/data.js';
import {getBalun} from './map.js';

const filtersContainer = document.querySelector('.map__filters');
const filtersType = filtersContainer.querySelector('#housing-type');
const filtersPrice = filtersContainer.querySelector('#housing-price');
const filtersRooms = filtersContainer.querySelector('#housing-rooms');
const filtersGuests = filtersContainer.querySelector('#housing-guests');
const filtersFeatures = filtersContainer.querySelectorAll('.map__checkbox');

const selectedStart = 'any';

const getFilterOffer = (offer) => {

  // const selectedType = filtersType.value;

  if (filtersType.value !== offer.offer.type && filtersType.value !== selectedStart) {
    return false;
  }

  let rangePrice = '';
  // const price  = offer.offer.price;

  if (offer.offer.price <= 10000) {
    rangePrice = 'low';
  } else if (offer.offer.price > 10000 && offer.offer.price < 50000) {
    rangePrice = 'middle';
  } else {
    rangePrice = 'high';
  }

  // const selectedPrice = filtersPrice.value;

  if (filtersPrice.value !== rangePrice && filtersPrice.value !== selectedStart) {
    return false;
  }

  // const selectedRooms = parseInt(filtersRooms.value, 10);

  if (parseInt(filtersRooms.value, 10) !== offer.offer.rooms && filtersRooms.value !== selectedStart) {
    return false;
  }

  // const selectedGuests = parseInt(filtersGuests.value, 10);

  if (parseInt(filtersGuests.value, 10) !== offer.offer.guests && filtersGuests.value !== selectedStart) {
    return false;
  }

  return true;
};

const sortFeatures = (offer) => {
  let rank = 0;

  for (let i=0; i<filtersFeatures.length; i++) {
    if (filtersFeatures[i].checked) {
      if (offer.offer.features) {
        for (let j=0; j < offer.offer.features.length; j++) {
          if(offer.offer.features[j] === filtersFeatures[i].value) {
            rank += 1;
          }
        }
      } else {
        rank -= 1;
      }
    }
  }
  return rank;
};

const compareOffers = (offerA, offerB) => {
  const rankA = sortFeatures(offerA);
  const rankB = sortFeatures(offerB);
  return rankB - rankA;
};

const setFilterOffers = (callback) => {
  filtersContainer.addEventListener('change', () => {

    callback();
  });
};

const renderOffer = (offers) => {
  const copyOffers = offers
    .slice()
    .filter(getFilterOffer)
    .sort(compareOffers)
    .slice(0, SIMILAR_OFFER_COUNT);
  getBalun(copyOffers);
};

export {setFilterOffers, renderOffer};

