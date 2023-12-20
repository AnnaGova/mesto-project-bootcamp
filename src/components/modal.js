import { removePopupOpendclass } from "./utils";

//Функция для закрытия попапов нажатием на оверлэй и кнопку закрытия
export function closePopups (evt) {
  if (evt.currentTarget === evt.target || evt.target.classList.contains('popup__button-close')) {
    const openedPopup = document.querySelector('.popup_opened');
    removePopupOpendclass(openedPopup);
  };
};
//Функция закрытия окна нажатием на копку esc
export function escPopupClose (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    removePopupOpendclass(openedPopup);
  };
};
