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
import {validationConfig} from "./utils";
import {enableValidation} from "./validate";

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const addCardCloseButton = popups.addCardPopup.querySelector(".popup__close-button");
const photoPopupCloseButton = popups.photoPopup.querySelector(".popup__close-button");
const editProfileCloseButton = popups.editProfilePopup.querySelector(".popup__close-button");

initialCards.forEach(card => cardContainer.append(createCardElement(card)));

editProfileButton.addEventListener("mousedown", e => e.preventDefault());
addCardButton.addEventListener("mousedown", e => e.preventDefault());

editProfileButton.addEventListener("click", editProfileButtonClick);

editProfileCloseButton.addEventListener("click", () => closePopup(popups.editProfilePopup));

editProfileForm.addEventListener("submit", submitEditProfileForm);

addCardButton.addEventListener("click",()  => {
  openPopup(popups.addCardPopup);
});

addCardCloseButton.addEventListener("click", () => {
  closePopup(popups.addCardPopup);
});

addCardForm.addEventListener("submit", submitAddCardForm);

photoPopupCloseButton.addEventListener("click", () => {
  closePopup(popups.photoPopup);
});

Object.keys(popups).forEach(popup => {
  popups[popup].addEventListener("click", e => {
    if(e.target.classList.contains("popup")) {
      closePopup(popups[popup]);
    }
  });
  popups[popup].addEventListener("keydown", e => {
    console.log(e.key);
    if(e.key === "Escape"){
      closePopup(popups[popup]);
    }
  });
});


enableValidation(validationConfig);
