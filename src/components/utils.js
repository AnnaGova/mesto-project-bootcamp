
// Функция для удаления класса 'popup_opened'
export function removePopupOpendclass(popup) {
  popup.classList.remove('popup_opened');
};

// Функция для открытия попапов
export function openPopup(popup) {
  popup.classList.add('popup_opened');
};
