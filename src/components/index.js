import {cardContainer} from './card';
import '../pages/index.css';
import {
  openPopup,
  closePopup,
  editProfileForm,
  submitEditProfileForm,
  handleEditProfileButtonClick,
  popups,
  addCardForm,
  submitAddCardForm,
  handleAddCardButtonClick,
  updateAvatarForm,
  submitUpdateAvatarForm,
  handleUpdateAvatarButtonClick,
  deleteCardForm,
  submitDeleteCardForm,
} from "./modal";
import {validationConfig} from "./constants";
import {enableValidation} from "./validate";
import {fetchUserInfo, getCards} from "./api";
import {setCards, setUser} from "./utils";

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const profileAvatarButton = document.querySelector(".profile__avatar-button");



editProfileButton.addEventListener("click", handleEditProfileButtonClick);
editProfileForm.addEventListener("submit", submitEditProfileForm);

addCardButton.addEventListener("click", handleAddCardButtonClick);

addCardForm.addEventListener("submit", submitAddCardForm);

deleteCardForm.addEventListener("submit", submitDeleteCardForm);

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


