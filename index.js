//Выбор элементов
const editButton = document.querySelector('.profile__button-edit');
const closeButton = document.querySelector('.popup__button-close');
const popupElement = document.querySelector('.popup');
const addButton = document.querySelector('.profile__button-add');
const photosPopup = document.querySelector('.popup-photos');
const photosPopupButton = document.querySelector('.popup-photos__button-close');
const placesList = document.querySelector('.cards__list');


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

const placeName = cardsElement.querySelector('.cards__name');
const placePhoto = cardsElement.querySelector('.cards__img');

const placesTeamplate = document.querySelector('#cards-teamplate').content;
const cardsElement = placesTeamplate.querySelector('.cards__item').cloneNode(true);
function creatCards() {
  return cardsElement;
};

for (let i=0; i < initialCards.length; i++) {
  creatCards();

  placeName.textContent = initialCards[i].name;
  placePhoto.src = initialCards[i].link;
  placePhoto.alt = initialCards[i].alt;

  placesList.append(cardsElement);

}

//добавление фотографий

const formPlaces = document.querySelector('.popup-photos__form');
const placeNameInput = formPlaces.querySelector('.popup__form-item_place');
const linkInput = formPlaces.querySelector('.popup__form-item_link')

function addPlaces(evt) {
  evt.preventDefault();
  //Копируем значение teanplate
  creatCards();

//Получаем значение полей ввода
  const namePlaceValue = placeNameInput.value;
  const linkValue = linkInput.value;
//выбираем места для вставки новых значений

//присваеваем новые значения
  placePhoto.src = linkValue;
  placeName.textContent = namePlaceValue;
//добавляем карточку в список
  placesList.prepend(cardsElement);

  photosPopup.classList.remove('popup_opened');

}

formPlaces.addEventListener('submit', addPlaces);



