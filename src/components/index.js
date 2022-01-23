import {cardContainer} from './card';
import '../pages/index.css';
import {
  openPopup,
  closePopup,
  editProfileForm,
  submitEditProfileForm,
  handleEditProfileButtonClick,
  popups, addCardForm, submitAddCardForm
} from "./modal";
import {createCardElement} from "./card";
import {profileNameEl, profileSubtitleEl, validationConfig} from "./constants";
import {enableValidation} from "./validate";
import {fetchUserInfo, getCards} from "./api";

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const profileAvatar = document.querySelector(".profile__avatar");

let user, cards;

export const handleAfterFetchUser = fetchedUser => {
  user = fetchedUser;
  profileNameEl.textContent = user.name;
  profileSubtitleEl.textContent = user.about;
  profileAvatar.src = user.avatar;
}

const handleAfterGetCards = fetchedCards => {
  cards = fetchedCards
  cards.forEach(card => {
    const cardElement = cardContainer.appendChild(createCardElement(card));
    const deleteButton = cardElement.querySelector(".card__delete-button");
    if(user) {
      if(user._id === card.owner._id) {
        deleteButton.classList.remove("card__delete-button_hidden");
      }else {
        deleteButton.classList.add("card__delete-button_hidden");
      }
    }else {
      deleteButton.classList.add("card__delete-button_hidden");
    }
  });
}

editProfileButton.addEventListener("click", handleEditProfileButtonClick);
editProfileForm.addEventListener("submit", submitEditProfileForm);

addCardButton.addEventListener("click",() => openPopup(popups.addCardPopup));

addCardForm.addEventListener("submit", submitAddCardForm);

Object.keys(popups).forEach(popup => {
  popups[popup].addEventListener("mousedown", e => {
    if(e.target.classList.contains("popup") || e.target.classList.contains("popup__close-button")) {
      closePopup(popups[popup]);
    }
  });
});

enableValidation(validationConfig);

fetchUserInfo()
  .then(fetchedUser => {
    handleAfterFetchUser(fetchedUser);
    return getCards()
  }).then(fetchedCards => {
    handleAfterGetCards(fetchedCards);
})
  .catch(err => console.log(err));


