const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error",
};

const showInputError = (formEl, inputEL, errorMsg, config) => {
  const errorMsgEl = formEl.querySelector(`#${inputEL.id}-error`);
  errorMsgEl.textContent = errorMsg;
  inputEL.classList.add(config.inputErrorClass);
  errorMsgEl.classList.add(config.errorClass);
};

const hideInputError = (formEl, inputEL, config) => {
  const errorMsgEl = formEl.querySelector(`#${inputEL.id}-error`);
  errorMsgEl.textContent = "";
  inputEL.classList.remove(config.inputErrorClass);
};

const checkInputValidity = (formEl, inputEL, config) => {
  if (!inputEL.validity.valid) {
    showInputError(formEl, inputEL, inputEL.validationMessage, config);
  } else {
    hideInputError(formEl, inputEL, config);
  }
};

const hasInvalidInput = (inputList, config) => {
  return inputList.some((inputEL, config) => {
    return !inputEL.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonEl, config) => {
  if (hasInvalidInput(inputList, config)) {
    disableButton(buttonEl, config);
  } else {
    buttonEl.classList.remove = config.inactiveButtonClass;
    buttonEl.disabled = false;
  }
};

const disableButton = (buttonEl, config) => {
  buttonEl.classList.add(config.inactiveButtonClass);
  buttonEl.disabled = true;
};

const setEventListeners = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonElement = formEl.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formEl, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formEl) => {
    setEventListeners(formEl, config);
  });
};

enableValidation(settings);
