

function hideInputErrors(inputElement, errorElement, config) {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

function showInputErrors(inputElement, errorElement, config) {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

export function toggleButtonState(submitButton, isActive, config) {

  if (!isActive) {
    submitButton.disabled = true;
    submitButton.classList.add(config.inactiveButtonClass);
  } else {
    submitButton.disabled = false;
    submitButton.classList.remove(config.inactiveButtonClass);
  }
}

function setEventListener(form, config) {
  const inputList = form.querySelectorAll(config.inputSelector);
  const submitButton = form.querySelector(config.submitButtonSelector);

  toggleButtonState(submitButton, form.checkValidity(), config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement, form, config);
      toggleButtonState(submitButton, form.checkValidity(), config);
    });
  });
}

function checkInputValidity(inputElement, form, config) {
  const isValid = inputElement.validity.valid;
  const errorElement = form.querySelector(`#${inputElement.name}-error`);

  if (!isValid) {
    showInputErrors(inputElement, errorElement, config);
  } else {
    hideInputErrors(inputElement, errorElement, config);
  }
}

export function enableValidation(config) {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach(function (form) {
    setEventListener(form, config);
  });
}
