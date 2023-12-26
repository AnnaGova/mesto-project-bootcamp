import './styles/index.css';

//Импорт функции для удления, лайков и открытия попапов картинок
import { enableValidation, formConfig } from './components/validate';
import { closePopup, openPopup } from './components/modal';
import * as constants from './components/constants';
import * as api from './components/api';
import { CreateCrads, renderCrads } from './components/card';
export let userID = null;

//Отображение карточек сервера

api.getInitialCrads()
  .then(data => {
    data.forEach(function (card) {
      renderCrads(card, constants.placesList);
    });
  })
  .catch((err) => {
    console.log(err);
  });


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
    text: 'Сохраняем...',
    disabled: true
  })
  const imgAva = document.querySelector('.profile__avatar');
  const newAvaLink = document.querySelector('.popup__form_editavatar');
  const avaLinkValue = newAvaLink.value;

  const newProfAva = {avatar: avaLinkValue}

  api.newAvatar(newProfAva)
    .then(dataFromServer => {
      imgAva.src = dataFromServer.avatar;
      constants.avatarEditForm.reset();
      closePopup(constants.popupAvatar);
    })
    .catch(error => {
      console.error('Error updating avatar:', error);
      // Handle the error as needed
    });
  }

constants.avatarEditForm.addEventListener('submit', changeAvatar);

// Обработчик «отправки» формы редактирования данных профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    setStatusButton({
      button: constants.submitButtonProfile,
      text: 'Сохраняем...',
      disabled: true
    })

    const nameValue = constants.nameInput.value;
    const jobValue = constants.jobInput.value;

    const newProfInfo = {name: nameValue, about: jobValue};

    api.editProfile(newProfInfo).then(serverData => {
      constants.profileName.textContent = serverData.name;
      constants.profileDescription.textContent = serverData.about;
    })

    closePopup(constants.profilePopup);

};

// Прикрепляем обработчик к форме:
constants.formElement.addEventListener('submit', handleProfileFormSubmit);


//функция добавления новой карточки
function addPlaces(evt) {
  evt.preventDefault();
  setStatusButton({
    button: constants.submitAddPhotosButton,
    text: 'Создаем...',
    disabled: true
  })
  const dataPicfromBody = {
    name: constants.placeNameInput.value,
    link: constants.linkInput.value

  };
  api.addNewCard(dataPicfromBody).then(NewCradDataServ =>
    renderCrads(NewCradDataServ, constants.placesList, 'prepend'));

    closePopup(constants.photosPopup);
};

//Валидация форм
enableValidation(formConfig);


Promise.all([api.gerUsersInformation(), api.getInitialCrads()])
  .then(([profData, cradsData]) => {

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
