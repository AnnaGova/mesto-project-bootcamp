//Выбор элементов
const likeButtons = document.querySelectorAll('.cards__button-like');
const deleteButtons = document.querySelectorAll('.cards__button-delete');
const editButton = document.querySelector('.profile__button-edit');
const closeButton = document.querySelector('.popup__button-close');
const popupElement = document.querySelector('.popup');
const addButton = document.querySelector('.profile__button-add');
const photosPopup = document.querySelector('.popup-photos');
const  photosPopupButton = document.querySelector('.popup-photos__button-close');

//Функция активации кнопки cards__button-like.
  likeButtons.forEach(function(likeButton) {
    likeButton.addEventListener('click', function(evt) {
      evt.target.classList.toggle('cards__button-like_active')
  });

});

//функция для удаления карточек при нажатии на кнпку

deleteButtons.forEach(function(deleteButton) {
  deleteButton.addEventListener('click', function(evt) {
    const cardsItem = document.querySelector('.cards__item');
    cardsItem.remove()
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
let nameInput = document.querySelector('.popup__form-item_name');
let jobInput = document.querySelector('.popup__form-item_description');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    let nameValue = nameInput.value;
    let jobValue = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей

   let profileName = document.querySelector('.profile__name');
   let profileDescription = document.querySelector('.profile__description');

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

//добавление фотографий

const formPlaces = document.querySelector('.popup-photos__form');
const placeNameInput = formPlaces.querySelector('.popup__form-item_place');
const linkInput = formPlaces.querySelector('.popup__form-item_link')

function addPlaces(evt) {
  evt.preventDefault();

  const placesList = document.querySelector('.cards__list');
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
