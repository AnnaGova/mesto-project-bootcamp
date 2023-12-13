//Выбор элементов
const editButton = document.querySelector('.profile__button-edit');
const closeButton = document.querySelector('.popup__button-close');
const popupElement = document.querySelector('.popup');
const addButton = document.querySelector('.profile__button-add');
const photosPopup = document.querySelector('.popup-photos');
const  photosPopupButton = document.querySelector('.popup-photos__button-close');
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

//добавление фотографий

const formPlaces = document.querySelector('.popup-photos__form');
const placeNameInput = formPlaces.querySelector('.popup__form-item_place');
const linkInput = formPlaces.querySelector('.popup__form-item_link')

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

  photosPopup.classList.remove('popup_opened');

}

formPlaces.addEventListener('submit', addPlaces);


const likeButtons = document.querySelectorAll('.cards__button-like');

//Функция активации кнопки cards__button-like.
  likeButtons.forEach(function(likeButton) {
    likeButton.addEventListener('click', function(evt) {
      evt.target.classList.toggle('cards__button-like_active');

  });

});

const deleteButtons = document.querySelectorAll('.cards__button-delete');
//функция для удаления карточек при нажатии на кнпку

deleteButtons.forEach(function(deleteButton) {
  deleteButton.addEventListener('click', function(evt) {
    const cardsItem = document.querySelector('.cards__item');
    evt.target.cardsItem.remove()
  });

});

//Функция для открытия модального окна редактирования информации о пользователе

editButton.addEventListener('click', function() {
  popupElement.classList.add('popup_opened');

});

//Функция для закртия модального окна при нажатии на крестик

closeButton.addEventListener('click', function() {
  popupElement.classList.remove('popup_opened');
});

//Сохранение данных

// Находим форму в DOM
const formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__form-item_name');
const jobInput = document.querySelector('.popup__form-item_description');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей

   const profileName = document.querySelector('.profile__name');
   const profileDescription = document.querySelector('.profile__description');

    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameValue;
    profileDescription.textContent = jobValue;

    popupElement.classList.remove('popup_opened')

}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

//Добавление фотографий

addButton.addEventListener('click', function(evt){
  photosPopup.classList.add('popup_opened');
});

photosPopupButton.addEventListener('click', function(){
  photosPopup.classList.remove('popup_opened');
});

//Открытие попапа с картинкой

//Выбираем все картинки

const pictures = document.querySelectorAll('.cards__img');
const picturesPopup = document.querySelector('.pictures-popup');

pictures.forEach(function(picture) {
  picture.addEventListener('click', function(){
    picturesPopup.classList.add('popup_opened');
    const imgPopup = document.querySelector('.pictures-popup__img');
    imgPopup.src = picture.getAttribute('src');
    imgPopup.alt = picture.getAttribute('alt');

    //Переменная для текста под картинкой в окне попап
    const textPicPopup = document.querySelector('.pictures-popup__text');
    //Выбираем ближайшую карточку
    const card = picture.closest('.cards__item')
    //Переменная для текста с карточки картинки
    const cardtexts = card.querySelector('.cards__name').textContent;
    //Присваеваем текст блоку попап
    textPicPopup.textContent = cardtexts;

  });

});

//Кнопка закртыия попапа картинки

const buttonClosePicPopup = document.querySelector('.pictures-popup__button-close');

buttonClosePicPopup.addEventListener('click', function() {
  picturesPopup.classList.remove('popup_opened');
});

// Event delegation for like and delete buttons
placesList.addEventListener('click', function (evt) {
  const target = evt.target;

  // Check if the clicked element is a like button
  if (target.classList.contains('cards__button-like')) {
    target.classList.toggle('cards__button-like_active');
  }

  // Check if the clicked element is a delete button
  if (target.classList.contains('cards__button-delete')) {
    // Handle delete button click (e.g., remove the corresponding card)
    const cardItem = target.closest('.cards__item');
    if (cardItem) {
      cardItem.remove();
    }
  }
});

