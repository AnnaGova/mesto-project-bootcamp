//Список карточек
const placesList = document.querySelector('.cards__list');
const picturesPopup = document.querySelector('.pictures-popup');
const imgPopup = document.querySelector('.pictures-popup__img');
const textPicPopup = document.querySelector('.pictures-popup__text');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'Красивое место'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Красивое место'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Красивое место'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Красивое место'

  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'Красивое место'

  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Красивое место'

  }
];

import { openPopup } from "./modal";

//Функция createCard находит в DOM элемент cards-teamplate, копирует его содержимое и возвращает новую пустую карточку
export function createCard () {
  const placesTeamplate = document.querySelector('#cards-teamplate').content;
  const cardsElement = placesTeamplate.querySelector('.cards__item').cloneNode(true);

  return cardsElement
};

export function fillCard () {
  for (let i=0; i < initialCards.length; i++) {

    const cardElement = createCard();

    const placeName = cardElement.querySelector('.cards__name');
    const placePhoto = cardElement.querySelector('.cards__img');

    placeName.textContent = initialCards[i].name;
    placePhoto.src = initialCards[i].link;
    placePhoto.alt = initialCards[i].alt;

    placesList.append(cardElement);

  }

};

export function setCardsEventListeners () {
  placesList.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('cards__button-like')) {
      evt.target.classList.toggle('cards__button-like_active');
    }

    if (evt.target.classList.contains('cards__button-delete')) {
      const cardItem = evt.target.closest('.cards__item');
      cardItem.remove();
    }

    if (evt.target.classList.contains('cards__img')) {
      openPopup(picturesPopup);
      imgPopup.src = evt.target.getAttribute('src');
      imgPopup.alt = evt.target.getAttribute('alt');
      //Выбираем ближайшую карточку
      const card = evt.target.closest('.cards__item')
      //Переменная для текста с карточки картинки
      const cardtexts = card.querySelector('.cards__name').textContent;
      //Присваеваем текст блоку попап
      textPicPopup.textContent = cardtexts;

    }

  });
};
