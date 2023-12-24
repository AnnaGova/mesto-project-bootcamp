const popups = document.querySelectorAll('.popup')

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  window.addEventListener('keydown', escPopupClose);
};

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  window.removeEventListener('keydown', escPopupClose);
};


//Функция закрытия окна нажатием на копку esc
export function escPopupClose (evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened')
    closePopup(popupOpened);
  };
};


popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup)
      }
      if (evt.target.classList.contains('popup__button-close')) {
        closePopup(popup)
      }
  })
});
