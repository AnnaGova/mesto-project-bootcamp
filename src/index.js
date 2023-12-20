import './styles/index.css';
import { fillCard } from './components/card';
//Импорт функции для удления, лайков и открытия попапов картинок
import { setCardsEventListeners } from './components/card';
import { addPlaces } from './components/card';
import { openPopup } from './components/utils';
import { closePopups } from './components/modal';
import { escPopupClose } from './components/modal';
import { removePopupOpendclass } from './components/utils';
import { enableValidation, formConfig } from './components/validate';

//Выбор элементов
const editButton = document.querySelector('.profile__button-edit');
const profilePopup = document.querySelector('.profile-popup');
const addButton = document.querySelector('.profile__button-add');
const photosPopup = document.querySelector('.popup-photos');
const picturesPopup = document.querySelector('.pictures-popup');
const formPlaces = document.forms['addPhotos'];
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__form-item_name');
const jobInput = document.querySelector('.popup__form-item_description');

//Добавление карточек с картинками через список
fillCard();
setCardsEventListeners();
//Добавление фотографий через форму в popup
formPlaces.addEventListener('submit', addPlaces);
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


//Валидация форм
enableValidation(formConfig);
