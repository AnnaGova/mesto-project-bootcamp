
export const formConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__form-item_error',
  errorClass: 'text-error_visible'
};


//Валидация форм
//Функция скрывающая сообщение об ошибке
function hideIputErrors (inputElement, errorElement, config) {
  inputElement.classList.remove(formConfig.inputErrorClass);
  errorElement.textContent  = inputElement.validationMessage;
};
//Функция показывающая сообщение об ошибке
function showInputErrors (inputElement, errorElement, config) {
  inputElement.classList.add(formConfig.inputErrorClass);
  errorElement.textContent  = inputElement.validationMessage;
}
//Функция для изменения состояния конпки
function toggleButtonState (submitButton, isActive) {
  if (isActive) {
    submitButton.disabled = false;
    submitButton.classList.remove(formConfig.inactiveButtonClass);
  } else {
    submitButton.disabled = "disabled";
    submitButton.classList.add(formConfig.inactiveButtonClass);
  };

};

function setEventListener (form, config) {
  const inputList = form.querySelectorAll(formConfig.inputSelector);
  const submitButton = form.querySelector(formConfig.submitButtonSelector);

  toggleButtonState(submitButton, form.checkValidity(), config);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(inputElement, form, config);
        toggleButtonState(submitButton, form.checkValidity(), config);

      });
    });
};

function checkInputValidity(inputElement, form, config) {
  const isValid = inputElement.validity.valid;
  const errorElement = form.querySelector(`#${inputElement.name}-error`);

  if (!isValid) {
    showInputErrors(inputElement, errorElement, config);
  } else {
    hideIputErrors(inputElement, errorElement, config);
  }
};



 export function enableValidation (config) {
  const formList = document.querySelectorAll(formConfig.formSelector);
  formList.forEach(function (form) {
    setEventListener(form, config);
  });
};

