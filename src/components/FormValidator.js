// // Функция отображения ошибки валидации поля
// const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass, ...config}) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add(inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(errorClass);
// }
// // Функция скрытия ошибки валидации поля
// const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass, ...config}) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove(inputErrorClass);
//   errorElement.classList.remove(errorClass);
//   errorElement.textContent = '';
// }
//
// //Функция проверки валидности поля ввода
// const checkInputValidity =  (formElement, inputElement, config) => {
//   if(!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage, config);
//   }else {
//     hideInputError(formElement, inputElement, config);
//   }
// };
//
// // Функция проверки списка полей ввода на наличие невалидных полей
// const hasInvalidInput = inputList => inputList.some(input => !input.validity.valid);
//
// // Функция переключения состояния кнопки отправки формы в зависимости от валидности полей формы
// const toggleButtonState = (inputList, buttonElement) => {
//   if(hasInvalidInput(inputList)) {
//     buttonElement.disabled = true;
//   }else{
//     buttonElement.disabled = false;
//   }
// }
//
// // Функция установки обработчиков события для полей ввода формы
// const setEventListeners = (formElement, {inputSelector, submitButtonSelector, ...config}) => {
//   const inputList = Array.from(formElement.querySelectorAll(inputSelector));
//   const buttonElement = formElement.querySelector(submitButtonSelector);
//   toggleButtonState(inputList, buttonElement);
//   inputList.forEach(inputElement => {
//     inputElement.addEventListener('input', () => {
//       checkInputValidity(formElement, inputElement, config);
//       toggleButtonState(inputList, buttonElement);
//     });
//   });
// }
//
// // Функция для ручной валидации формы
// export const validateForm = (formElement, {inputSelector, submitButtonSelector, ...config}) => {
//   const inputList = Array.from(formElement.querySelectorAll(inputSelector));
//   const buttonElement = formElement.querySelector(submitButtonSelector);
//   inputList.forEach(inputElement => {
//     checkInputValidity(formElement, inputElement, config);
//     toggleButtonState(inputList, buttonElement);
//   })
// }
//
// export const enableValidation = ({formSelector, ...config}) => {
//   const formList = Array.from(document.querySelectorAll(formSelector));
//   formList.forEach(formElement => setEventListeners(formElement, {formSelector, ...config}));
// }

export default class FormValidator {
  constructor({formSelector, inputSelector, submitButtonSelector, inputErrorClass, errorClass}, formElement) {
    this._formSelector = formSelector;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._formElement = formElement;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if(!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    }else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some(input => !input.validity.valid);
  }

  _toggleButtonState(inputList, buttonElement) {
    if(this._hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
    }else{
      buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  validateForm() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    inputList.forEach(inputElement => {
      this._checkInputValidity(inputElement);
      this._toggleButtonState(inputList, buttonElement);
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
