import {createAdverts} from './data.js';

const advertInsertBlock = document.querySelector('.map__canvas');
const advertTemplate = document.querySelector('#card').content.querySelector('.popup');

const TYPES_OF_HOUSES = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const similarAdverts = createAdverts();
const advertFragment = document.createDocumentFragment();


similarAdverts.forEach(({author, offer}) => {
  const advertElement = advertTemplate.cloneNode(true);

  // Features
  const advertFeatures = offer.features;
  const popupFeaturesList = advertElement.querySelector('.popup__features').querySelectorAll('.popup__feature');

  popupFeaturesList.forEach((popupFeaturesItem) => {
    const isNecessary = advertFeatures.some(
      (advertFeature) => popupFeaturesItem.classList.contains(`popup__feature--${advertFeature}`),
    );

    if (!isNecessary) {
      popupFeaturesItem.remove();
    }
  });

  // Photos
  const advertPhotos = offer.photos;
  const popupPhotosContainer = advertElement.querySelector('.popup__photos');
  const popupPhotosList = popupPhotosContainer.querySelector('.popup__photo');

  advertPhotos.forEach((advertPhoto) => {
    const popupPhotosListClone = popupPhotosList.cloneNode(true);
    popupPhotosListClone.src = advertPhoto;
    popupPhotosContainer.appendChild(popupPhotosListClone);
    popupPhotosList.remove();
  });

  // Проверяем, есть ли данные для заполнения (textContent)
  const addTextContentIfExists = function (content, classAdvert) {
    if (content) {
      advertElement.querySelector(classAdvert).textContent = content;
    } else {
      advertElement.querySelector(classAdvert).classList.add('hidden');
    }
  };

  // Title, address, type, description
  addTextContentIfExists(offer.title, '.popup__title');
  addTextContentIfExists(offer.address, '.popup__text--address');
  addTextContentIfExists(TYPES_OF_HOUSES[offer.type], '.popup__type');
  addTextContentIfExists(offer.description, '.popup__description');

  // Price, capacity, time
  if (offer.price) {
    advertElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  } else {
    advertElement.querySelector('.popup__text--price').classList.add('hidden');
  }

  if (offer.rooms && offer.guests) {
    advertElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  } else {
    advertElement.querySelector('.popup__text--capacity').classList.add('hidden');
  }

  if (offer.rooms && offer.guests) {
    advertElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  } else {
    advertElement.querySelector('.popup__text--time').classList.add('hidden');
  }

  // Проверяем, есть ли данные для заполнения (src)
  const addSrcIfExists = function (content, classAdvert) {
    if (content) {
      advertElement.querySelector(classAdvert).src = content;
    } else {
      advertElement.querySelector(classAdvert).classList.add('hidden');
    }
  };

  // avatar
  addSrcIfExists(author.avatar, '.popup__avatar');


  advertFragment.appendChild(advertElement);
});

const advertGenerate = () => advertInsertBlock.appendChild(advertFragment);

export {advertGenerate};
