import {SIMILAR_OFFER_COUNT} from './utils/data.js';
import {getBalun} from './map.js';

const ANY_VALUE = 'any';
const PriceRange = {
  low: 10000,
  high: 50000,
};
const LOW_PRICE = 'low';
const MIDDLE_PRICE = 'middle';
const HIGH_PRICE = 'high';
const filtersContainer = document.querySelector('.map__filters');
const filtersType = filtersContainer.querySelector('#housing-type');
const filtersPrice = filtersContainer.querySelector('#housing-price');
const filtersRooms = filtersContainer.querySelector('#housing-rooms');
const filtersGuests = filtersContainer.querySelector('#housing-guests');
const filtersFeatures = filtersContainer.querySelectorAll('.map__checkbox');

const getFilterOffer = (offer) => {

  if (filtersType.value !== offer.offer.type && filtersType.value !== ANY_VALUE) {
    return false;
  }

  let rangePrice = '';

  if (offer.offer.price <= PriceRange.low) {
    rangePrice = LOW_PRICE;
  } else if (offer.offer.price > PriceRange.low && offer.offer.price < PriceRange.high) {
    rangePrice = MIDDLE_PRICE;
  } else {
    rangePrice = HIGH_PRICE;
  }

  if (filtersPrice.value !== rangePrice && filtersPrice.value !== ANY_VALUE) {
    return false;
  }

  const selectedRooms = parseInt(filtersRooms.value, 10);
  if (selectedRooms !== offer.offer.rooms && filtersRooms.value !== ANY_VALUE) {
    return false;
  }

  const selectedGuests = parseInt(filtersGuests.value, 10);
  if (selectedGuests !== offer.offer.guests && filtersGuests.value !== ANY_VALUE) {
    return false;
  }

  for (let i=0; i<filtersFeatures.length; i++) {
    if (filtersFeatures[i].checked) {
      if (offer.offer.features) {
        const checkedElement = filtersFeatures[i].value;
        const featureElement = offer.offer.features.find((valueFeature) => valueFeature.includes(checkedElement));

        if(checkedElement !== featureElement) {
          return false;
        }
      } else {
        return false;
      }
    }
  }
  return true;
};

const compareOffers = (offerA, offerB) => {
  const featuresCountA = Array.isArray(offerA.offer.features) ? offerA.offer.features.length : 0;
  const featuresCountB = Array.isArray(offerB.offer.features) ? offerB.offer.features.length : 0;
  return featuresCountB - featuresCountA;
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

