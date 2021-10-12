import { getRandomNumber, getRandomFloatNumber, getRandomArrayElement } from '/js/utils/get-random-number.js';

const timeOffer = [
  '12:00',
  '13:00',
  '14:00',
];

const typeOffer = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const featuresOffer = [
  'wi-fi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const SIMILAR_OFFER_COUNT = 10;

const avatarArchive = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png',
  'img/avatars/user09.png',
  'img/avatars/user10.png',
];

const photoArchive = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const Lat = {
  MIN: 35.65000,
  MAX: 35.70000,
  FIXFLOAT: 5,
};

const Long = {
  MIN: 139.70000,
  MAX: 139.80000,
  FIXFLOAT: 5,
};

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
      type: getRandomArrayElement(typeOffer),
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
