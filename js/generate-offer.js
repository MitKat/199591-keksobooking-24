import { getRandomNumber, getRandomFloatNumber, getRandomArrayElement } from '/js/utils/random.js';
import {SIMILAR_OFFER_COUNT, typeOffer, Lat, Long, photoArchive, avatarArchive, timeOffer, featuresOffer} from '/js/utils/given-data.js';

let index = 0;

const generateOffer = () => {

  index += 1;

  const latitude = getRandomFloatNumber(Lat.MIN, Lat.MAX, Lat.FIXFLOAT);
  const longitude = getRandomFloatNumber(Long.MIN, Long.MAX, Long.FIXFLOAT);

  const location = {
    lat: latitude,
    lng: longitude,
  };

  const featuresLength = getRandomNumber(1, featuresOffer.length);
  const features = featuresOffer.slice(0, featuresLength);

  const photosLength = getRandomNumber(1, photoArchive.length);
  const photos = photoArchive.slice(0, photosLength);

  return  {
    author : {
      avatar: avatarArchive[index % avatarArchive.length],
    },
    offer : {
      title: 'Главное предложение месяца',
      address: `${location.lat} ${location.lng}`,
      price: getRandomNumber(300, 1000),
      guests: getRandomNumber(1, 10),
      rooms: getRandomNumber(1, 200),
      typeOffer: getRandomArrayElement(typeOffer),
      checkin: getRandomArrayElement(timeOffer),
      checkout: getRandomArrayElement(timeOffer),
      features,
      description: 'бесконечное солнце в вашей жизни',
      photos,
    },
    location,
  };
};

const similarOffer = Array.from({length: SIMILAR_OFFER_COUNT}, generateOffer);

export {similarOffer};
