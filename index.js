const likeButtons = document.querySelectorAll('.cards__button-like');

//Функция активации кнопки cards__button-like.
  likeButtons.forEach(function(likeButton) {
    likeButton.addEventListener('click', function(evt) {
      evt.target.classList.toggle('cards__button-like_active')
  });

});

const deleteButtons =document.querySelectorAll('.cards__button-delete');

//функция для удаления карточек при нажатии на кнпку

deleteButtons.forEach(function(deleteButton) {
  deleteButton.addEventListener('click', function(evt) {
    const cardsItem = document.querySelector('.cards__item');
    cardsItem.remove()
  });

});
