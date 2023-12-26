import './styles/index.css';

export const formConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__form-item_error',
  errorClass: 'text-error_visible'
};



//Импорт функции для удления, лайков и открытия попапов картинок
import { enableValidation } from './components/validate';
import { closePopup, openPopup } from './components/modal';
import * as constants from './components/constants';
import * as api from './components/api';
import { createCradsreateCrads, renderCrads } from './components/card';
export let userID = null;

//Отображение карточек сервера

//Добавление фотографий через форму в popup
constants.formPlaces.addEventListener('submit', addPlaces);

//Кнопка открытия редактирования профиля
constants.editButton.addEventListener('click', function() {
  constants.nameInput.value = constants.profileName.textContent;
  constants.jobInput.value = constants.profileDescription.textContent;
  openPopup(constants.profilePopup);
});
// Использование функции для открытия попапа добавления новых мест
constants.addButton.addEventListener('click', function(){
  openPopup(constants.photosPopup);
  constants.submitAddPhotosButton.setAttribute('disabled', true);
  constants.submitAddPhotosButton.classList.add('popup__button-save_disabled');
  constants.formPlaces.reset();
});
//Кнопка редактирования аватара
constants.editAvatar.addEventListener('click', function() {
  openPopup(constants.popupAvatar);
  constants.vatarSubmitButton.setAttribute('disabled', true);
  constants.vatarSubmitButton.classList.add('popup__button-save_disabled');

})



//Функция изменения фотографии профиля
function changeAvatar(evt) {
  evt.preventDefault();
  setStatusButton({
    button: constants.vatarSubmitButton,
    text: 'Сохранение...',
    disabled: true
  })

  const avaLinkValue = constants.newAvaLink.value;

  const newProfAva = {avatar: avaLinkValue}

  api.newAvatar(newProfAva)
    .then(dataFromServer => {
      constants.imgAva.src = dataFromServer.avatar;
      constants.avatarEditForm.reset();
      closePopup(constants.popupAvatar);
    })
    .catch(error => {
      console.error('Error updating avatar:', error);
      // Handle the error as needed
    })
    .finally(() => {
      setStatusButton({
        button: constants.vatarSubmitButton,
        text: 'Сохранить',
        disabled: false
      })
    })
  }

constants.avatarEditForm.addEventListener('submit', changeAvatar);

// Обработчик «отправки» формы редактирования данных профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    setStatusButton({
      button: constants.submitButtonProfile,
      text: 'Сохранение...',
      disabled: true
    })

    const nameValue = constants.nameInput.value;
    const jobValue = constants.jobInput.value;

    const newProfInfo = {name: nameValue, about: jobValue};

    api.editProfile(newProfInfo)
    .then(serverData => {
      constants.profileName.textContent = serverData.name;
      constants.profileDescription.textContent = serverData.about;
      closePopup(constants.profilePopup);
    })
    .catch(error => {
      console.error('Error editing frofile Information:', error);
      // Handle the error as needed
    })
    .finally(() => {
      setStatusButton({
        button: constants.submitButtonProfile,
        text: 'Сохранить',
        disabled: false
      })
    })
};

// Прикрепляем обработчик к форме:
constants.formElement.addEventListener('submit', handleProfileFormSubmit);


//функция добавления новой карточки
function addPlaces(evt) {
  evt.preventDefault();
  setStatusButton({
    button: constants.submitAddPhotosButton,
    text: 'Сохранение...',
    disabled: true
  })
  const dataPicfromBody = {
    name: constants.placeNameInput.value,
    link: constants.linkInput.value

  };
  api.addNewCard(dataPicfromBody)
  .then(NewCradDataServ => {
    renderCrads(NewCradDataServ, constants.placesList, 'prepend')
    closePopup(constants.photosPopup);
  })
  .catch(error => {
    console.error('Error adding new card:', error);
    // Handle the error as needed
  })
  .finally(() => {
    setStatusButton({
      button: constants.submitAddPhotosButton,
      text: 'Загрузить',
      disabled: false
    })
  })
};

//Валидация форм
enableValidation(formConfig);


Promise.all([api.gerUsersInformation(), api.getInitialCrads()])
  .then(([profData, cradsData]) => {
    constants.profileName.textContent = profData.name;
    constants.profileDescription.textContent = profData.about;
    constants.imgAva.src = profData.avatar;
    userID = profData._id;
    cradsData.forEach((card) => {
      renderCrads(card, constants.placesList);

    });
  })
  .catch(console.error)

//Улучшение ux

function setStatusButton({button, text, disabled}) {
  if(!disabled) {
    button.disabled = false
  } else {
    button.disabled = 'disabled'
  }
  button.textContent = text;
}
