//Добавление карточек с картинками через список
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

for (let i=0; i < initialCards.length; i++) {
  const placesTeamplate = document.querySelector('#cards-teamplate').content;
  const cardsElement = placesTeamplate.querySelector('.cards__item').cloneNode(true);

  const placeName = cardsElement.querySelector('.cards__name');
  const placePhoto = cardsElement.querySelector('.cards__img');

  placeName.textContent = initialCards[i].name;
  placePhoto.src = initialCards[i].link;
  placePhoto.alt = initialCards[i].alt;

  placesList.append(cardsElement);

}

function addPlaces(evt) {
  evt.preventDefault();
  //Копируем значение teanplate
  const placesTeamplate = document.querySelector('#cards-teamplate').content;
  const cardsElement = placesTeamplate.querySelector('.cards__item').cloneNode(true);
//Получаем значение полей ввода
  const namePlaceValue = placeNameInput.value;
  const linkValue = linkInput.value;
//выбираем места для вставки новых значений
  const placeName = cardsElement.querySelector('.cards__name');
  const placePhoto = cardsElement.querySelector('.cards__img');
//присваеваем новые значения
  placePhoto.src = linkValue;
  placeName.textContent = namePlaceValue;
//добавляем карточку в список
  placesList.prepend(cardsElement);

  removePopupOpendclass(photosPopup);

}
