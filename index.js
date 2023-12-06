//Выбор элементов
const likeButtons = document.querySelectorAll('.cards__button-like');
const deleteButtons = document.querySelectorAll('.cards__button-delete');
const editButton = document.querySelector('.profile__button-edit');
const closeButton = document.querySelector('.popup__button-close');
const popupElement = document.querySelector('.popup');


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
  popupElement.classList.remove('popup_opened')

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
