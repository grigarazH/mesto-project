import {cardContainer, initialCards} from './card';
import '../pages/index.css';
import {
  openPopup,
  closePopup,
  editProfileForm,
  submitEditProfileForm,
  editProfileButtonClick,
  popups, addCardForm, submitAddCardForm
} from "./modal";
import {createCardElement} from "./card";
import {validationConfig} from "./constants";
import {enableValidation} from "./validate";

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

initialCards.forEach(card => cardContainer.append(createCardElement(card)));

editProfileButton.addEventListener("mousedown", e => e.preventDefault());
addCardButton.addEventListener("mousedown", e => e.preventDefault());
editProfileButton.addEventListener("click", editProfileButtonClick);
editProfileForm.addEventListener("submit", submitEditProfileForm);

addCardButton.addEventListener("click",()  => {
  openPopup(popups.addCardPopup);
});

addCardForm.addEventListener("submit", submitAddCardForm);

Object.keys(popups).forEach(popup => {
  popups[popup].addEventListener("mousedown", e => {
    if(e.target.classList.contains("popup") || e.target.classList.contains("popup__close-button")) {
      closePopup(popups[popup]);
    }
  });
});

enableValidation(validationConfig);
