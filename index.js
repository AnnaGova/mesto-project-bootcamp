const likeButtons = document.querySelectorAll('.cards__button-like');

//Функция активации кнопки cards__button-like.
  likeButtons.forEach(function(likeButton) {
    likeButton.addEventListener('click', function(evt) {
      evt.target.classList.toggle('cards__button-like_active')
  });

});





