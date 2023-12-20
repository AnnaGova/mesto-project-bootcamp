//Выбор элементов
const editButton = document.querySelector('.profile__button-edit');
const profileCloseButton = document.querySelector('.popup__button-close');
const profilePopup = document.querySelector('.profile-popup');
const addButton = document.querySelector('.profile__button-add');
const photosPopup = document.querySelector('.popup-photos');
const addPlacesButtonClose = document.querySelector('.popup-photos__button-close');
const placesList = document.querySelector('.cards__list');
const cardsItem = document.querySelector('.cards__item');
const imgPopup = document.querySelector('.pictures-popup__img');
const picturesPopup = document.querySelector('.pictures-popup');
const picturesPopupButtonClose = document.querySelector('.pictures-popup__button-close');
const formPlaces = document.forms['addPhotos'];
const placeNameInput = formPlaces.querySelector('.popup__form-item_place');
const linkInput = formPlaces.querySelector('.popup__form-item_link');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
//Переменная для текста под картинкой в окне попап
const textPicPopup = document.querySelector('.pictures-popup__text');
// Находим форму в DOM
const formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__form-item_name');
const jobInput = document.querySelector('.popup__form-item_description');



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


function createCard () {
  const placesTeamplate = document.querySelector('#cards-teamplate').content;
  const cardsElement = placesTeamplate.querySelector('.cards__item').cloneNode(true);

  return cardsElement
};



for (let i=0; i < initialCards.length; i++) {

  const cardElement = createCard();

  const placeName = cardElement.querySelector('.cards__name');
  const placePhoto = cardElement.querySelector('.cards__img');

  placeName.textContent = initialCards[i].name;
  placePhoto.src = initialCards[i].link;
  placePhoto.alt = initialCards[i].alt;

  placesList.append(cardElement);

}

//Создание обработчиков для удаления, лайка и открытия попапа по кликуна картинку
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

const openedPopup = document.querySelector('.popup_opened');

// Функция для открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
};

// Функция для удаления класса 'popup_opened'
function removePopupOpendclass(popup) {
  popup.classList.remove('popup_opened');
};
//Функция для закрытия попапов нажатием на оверлэй и кнопку закрытия
function closePopups (evt) {
  if (evt.currentTarget === evt.target || evt.target.classList.contains('popup__button-close')) {
    const openedPopup = document.querySelector('.popup_opened');
    removePopupOpendclass(openedPopup);
  };
};
//Функция закрытия окна нажатием на копку esc
function escPopupClose (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    removePopupOpendclass(openedPopup);
  };
};


//Кнопка открытия редактирования профиля
editButton.addEventListener('click', function() {
  openPopup(profilePopup);
});

// Использование функции для открытия попапа добавления новых мест
addButton.addEventListener('click', function(){
  openPopup(photosPopup);
});

//Обработчики для закрытия попапов нажатием на овердей и кнопку
profilePopup.addEventListener('click', closePopups);
photosPopup.addEventListener('click', closePopups);
picturesPopup.addEventListener('click', closePopups);
//Обработчик для закрытия попапа нажатием на кнопку esc
window.addEventListener('keydown', escPopupClose);

//добавление фотографий

function addPlaces(evt) {
  evt.preventDefault();
  //Копируем значение teanplate
  const cardElement = createCard();
//Получаем значение полей ввода
  const namePlaceValue = placeNameInput.value;
  const linkValue = linkInput.value;
//выбираем места для вставки новых значений
  const placeName = cardElement.querySelector('.cards__name');
  const placePhoto = cardElement.querySelector('.cards__img');
//присваеваем новые значения
  placePhoto.src = linkValue;
  placeName.textContent = namePlaceValue;
//добавляем карточку в список
  placesList.prepend(cardElement);

  removePopupOpendclass(photosPopup);

}

formPlaces.addEventListener('submit', addPlaces);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameValue;
    profileDescription.textContent = jobValue;

    removePopupOpendclass(profilePopup);

}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleProfileFormSubmit);





const formConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__form-item_error',
  errorClass: 'text-error_visible'
};




//Валидация форм

function hideIputErrors (inputElement, errorElement, config) {
  inputElement.classList.remove(formConfig.inputErrorClass);
  errorElement.textContent  = inputElement.validationMessage;
};

function showInputErrors (inputElement, errorElement, config) {
  inputElement.classList.add(formConfig.inputErrorClass);
  errorElement.textContent  = inputElement.validationMessage;
}

function toggleButtonState (submitButton, isActive) {
  if (isActive) {
    submitButton.disabled = false;
    submitButton.classList.remove(formConfig.inactiveButtonClass);
  } else {
    submitButton.disabled = "disabled";
    submitButton.classList.add(formConfig.inactiveButtonClass);
  };

};

function setEventListener (form, config) {
  const inputList = form.querySelectorAll(formConfig.inputSelector);
  const submitButton = form.querySelector(formConfig.submitButtonSelector);

  toggleButtonState(submitButton, form.checkValidity(), config);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(inputElement, form, config);
        toggleButtonState(submitButton, form.checkValidity(), config);

      });
    });
};

function checkInputValidity(inputElement, form, config) {
  const isValid = inputElement.validity.valid;
  const errorElement = form.querySelector(`#${inputElement.name}-error`);

  if (!isValid) {
    showInputErrors(inputElement, errorElement, config);
  } else {
    hideIputErrors(inputElement, errorElement, config);
  }
};



function enableValidation (config) {
  const formList = document.querySelectorAll(formConfig.formSelector);
  formList.forEach(function (form) {
    setEventListener(form, config);
  });
};

enableValidation(formConfig);
