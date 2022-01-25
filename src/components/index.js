import {cardContainer} from './card';
import '../pages/index.css';
import {
  openPopup,
  closePopup,
  editProfileForm,
  submitEditProfileForm,
  handleEditProfileButtonClick,
  popups, addCardForm, submitAddCardForm,
  handleAddCardButtonClick, updateAvatarForm, submitUpdateAvatarForm, handleUpdateAvatarButtonClick,
} from "./modal";
import {createCardElement} from "./card";
import {profileAvatar, profileNameEl, profileSubtitleEl, validationConfig} from "./constants";
import {enableValidation} from "./validate";
import {fetchUserInfo, getCards} from "./api";

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const profileAvatarButton = document.querySelector(".profile__avatar-button");

let user, cards;

export const getUser = () => user;

export const setUser = newUser => {
  user = newUser;
  profileNameEl.textContent = user.name;
  profileSubtitleEl.textContent = user.about;
  console.log(profileAvatar.src);
  profileAvatar.src = user.avatar;
  console.log(profileAvatar.src);
}

export const setCards = fetchedCards => {
  console.log("setting cards");
  cardContainer.textContent = "";
  cards = fetchedCards
  cards.forEach(card => {
    const cardElement = cardContainer.appendChild(createCardElement(card));
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const likeButton = cardElement.querySelector(".card__like-button");
    if(card.likes.some(likeUser => likeUser._id === user._id)) {
      likeButton.classList.add("card__like-button_active");
    } else {
      likeButton.classList.remove("card__like-button_active");
    }
    if(user._id === card.owner._id) {
      deleteButton.classList.remove("card__delete-button_hidden");
    }else {
      deleteButton.classList.add("card__delete-button_hidden");
    }
  });
  console.log("set cards");
}

editProfileButton.addEventListener("click", handleEditProfileButtonClick);
editProfileForm.addEventListener("submit", submitEditProfileForm);

addCardButton.addEventListener("click", handleAddCardButtonClick);

addCardForm.addEventListener("submit", submitAddCardForm);

Object.keys(popups).forEach(popup => {
  popups[popup].addEventListener("mousedown", e => {
    if(e.target.classList.contains("popup") || e.target.classList.contains("popup__close-button")) {
      closePopup(popups[popup]);
    }
  });
});

profileAvatarButton.addEventListener("click", handleUpdateAvatarButtonClick);

updateAvatarForm.addEventListener("submit", submitUpdateAvatarForm);

enableValidation(validationConfig);

fetchUserInfo()
  .then(fetchedUser => {
    setUser(fetchedUser);
    return getCards()
  }).then(fetchedCards => {
    setCards(fetchedCards);
})
  .catch(err => console.log(err));


