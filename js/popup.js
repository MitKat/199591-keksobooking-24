import {similarOffer} from '/js/generate-offer.js';

const mapList = document.querySelector('#map-canvas');
const card = document.querySelector('#card');
const popup = card.content.querySelector('.popup');

similarOffer.forEach(({author, offer, location}) => {
  const popupItem = popup.cloneNode(true);

  popupItem.querySelector('.popup__avatar').src = author.avatar;
  popupItem.querySelector('.popup__title').textContent = offer.title;
  popupItem.querySelector('.popup__text--address').textContent = `${location.lat} ${location.lng}`;
  popupItem.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  popupItem.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнат для ${offer.guests} гостей`;
  popupItem.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  popupItem.querySelector('.popup__type').textContent = offer.type;
  popupItem.querySelector('.popup__description').textContent = offer.description;

  const featuresFragment = document.createDocumentFragment();

  offer.features.forEach((feature) => {
    const featuresItem = popupItem.querySelector(`.popup__feature--${feature}`);
    if (featuresItem) {
      featuresFragment.append(featuresItem);
    }
  });
  popupItem.querySelector('.popup__features').innerHTML= ' ';
  popupItem.querySelector('.popup__features').append(featuresFragment);

  const popupPhoto = popupItem.querySelector('.popup__photos');

  offer.photos.forEach((photo) => {
    const popupPhotoItem = document.createElement('img') ;
    popupPhotoItem.classList.add('popup__photo');
    popupPhotoItem.src = photo;
    popupPhotoItem.width = 45;
    popupPhotoItem.height = 40;
    popupPhotoItem.alt = 'фотография жилья';
    popupPhoto.appendChild(popupPhotoItem);
  });

  mapList.appendChild(popupItem);

});

export {popup};
