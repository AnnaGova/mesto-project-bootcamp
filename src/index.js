import './styles/index.css';
import { fillCard } from './components/card';
//Импорт функции для удления, лайков и открытия попапов картинок
import { setCardsEventListeners } from './components/card';
import { enableValidation, formConfig } from './components/validate';
import { createCard } from './components/card';
import { closePopup, openPopup } from './components/modal';

//Выбор элементов
const editButton = document.querySelector('.profile__button-edit');
const profilePopup = document.querySelector('.profile-popup');
const addButton = document.querySelector('.profile__button-add');
const photosPopup = document.querySelector('.popup-photos');
const picturesPopup = document.querySelector('.pictures-popup');
const formPlaces = document.forms['addPhotos'];
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const formElement = document.querySelector('.popup__profile-form');
const nameInput = document.querySelector('.popup__form-item_name');
const jobInput = document.querySelector('.popup__form-item_description');
const placesList = document.querySelector('.cards__list');
const submitAddPhotosButton =  document.querySelector('.popup-photos__button-save')

//Добавление карточек с картинками через список
fillCard();
setCardsEventListeners();
//Добавление фотографий через форму в popup
formPlaces.addEventListener('submit', addPlaces);
//Кнопка открытия редактирования профиля
editButton.addEventListener('click', function() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(profilePopup);
});
// Использование функции для открытия попапа добавления новых мест
addButton.addEventListener('click', function(){
  openPopup(photosPopup);
  submitAddPhotosButton.setAttribute('disabled', true);
  submitAddPhotosButton.classList.add('popup__button-save_disabled');
});



// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameValue;
    profileDescription.textContent = jobValue;

    closePopup(profilePopup);

};

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleProfileFormSubmit);


function addPlaces(evt) {
  evt.preventDefault();
  //Копируем значение teanplate
  const cardElement = createCard();
//Получаем значение полей ввода
  const placeNameInput = formPlaces.querySelector('.popup__form-item_place');
  const linkInput = formPlaces.querySelector('.popup__form-item_link');

  const namePlaceValue = placeNameInput.value;
  const linkValue = linkInput.value;


//выбираем места для вставки новых значений
  const placeName = cardElement.querySelector('.cards__name');
  const placePhoto = cardElement.querySelector('.cards__img');
//присваеваем новые значения
  placePhoto.src = linkValue;
  placeName.textContent = namePlaceValue;
  placePhoto.alt = namePlaceValue;
//добавляем карточку в список
  placesList.prepend(cardElement);

  closePopup(photosPopup);
  formPlaces.reset();

};

//Валидация форм
enableValidation(formConfig);

import { getUserInformation, getInitialCrads, editProfile, addNewCard } from './components/api';

getUserInformation();
getInitialCrads();
editProfile();
//addNewCard();
