const SIMILAR_OFFER_COUNT = 1;

const type = {
  palace: 'Дворец',
  bungalow: 'Бунгало',
  flat: 'Квартира',
  house: 'Дом',
  hotel: 'Отель',
};
const typeOffer = Object.keys(type);

const timeOffer = [
  '12:00',
  '13:00',
  '14:00',
];

const featuresOffer = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];


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

export {SIMILAR_OFFER_COUNT, type, typeOffer, Lat, Long, photoArchive, avatarArchive, timeOffer, featuresOffer};
