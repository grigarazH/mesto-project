// Функция отображения ошибки валидации поля
const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass, ...config}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}
// Функция скрытия ошибки валидации поля
const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass, ...config}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}

//Функция проверки валидности поля ввода
const checkInputValidity =  (formElement, inputElement, config) => {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  }else {
    hideInputError(formElement, inputElement, config);
  }
};

// Функция проверки списка полей ввода на наличие невалидных полей
const hasInvalidInput = inputList => inputList.some(input => !input.validity.valid);

// Функция переключения состояния кнопки отправки формы в зависимости от валидности полей формы
const toggleButtonState = (inputList, buttonElement) => {
  if(hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  }else{
    buttonElement.disabled = false;
  }
}

// Функция установки обработчиков события для полей ввода формы
const setEventListeners = (formElement, {inputSelector, submitButtonSelector, ...config}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

// Функция для ручной валидации формы
export const validateForm = (formElement, {inputSelector, submitButtonSelector, ...config}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  inputList.forEach(inputElement => {
    checkInputValidity(formElement, inputElement, config);
    toggleButtonState(inputList, buttonElement);
  })
}

export const enableValidation = ({formSelector, ...config}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach(formElement => setEventListeners(formElement, {formSelector, ...config}));
}
