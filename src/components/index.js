import Card from './Card';
import Section from "./Section";
import '../pages/index.css';
import {apiConfig, cardTemplateSelector, validationConfig} from "../utils/constants";
import FormValidator from "./FormValidator";
import Api from "./Api";
import {getCards, getDeleteCardId, setCards, setDeleteCardId} from "../utils/utils";
import PopupWithForm from "./PopupWithForm";
import PopupWithImage from "./PopupWithImage";
import UserInfo from "./UserInfo";

const profileAvatar = document.querySelector(".profile__avatar");
const addCardPopupElement = document.querySelector(".popup_type_add-card");
const editProfilePopupElement = document.querySelector(".popup_type_edit-profile");
const updateAvatarPopupElement = document.querySelector(".popup_type_update-avatar");
const editProfileForm = editProfilePopupElement.querySelector(".popup__container");
const addCardForm = addCardPopupElement.querySelector(".popup__container");
const updateAvatarForm = updateAvatarPopupElement.querySelector(".popup__container");
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const profileAvatarButton = document.querySelector(".profile__avatar-button");
const editProfileNameInput = editProfileForm.elements["edit-profile-name"];
const editProfileSubtitleInput = editProfileForm.elements["edit-profile-subtitle"];
const editProfileSubmitButton = editProfileForm.querySelector(".popup__submit");
const addCardSubmitButton = addCardPopupElement.querySelector(".popup__submit");
const updateAvatarSubmitButton = updateAvatarPopupElement.querySelector(".popup__submit");
const updateAvatarLinkInput = updateAvatarForm.elements["update-avatar-link"];
const addCardNameInput = addCardForm.elements["add-card-name"];
const addCardLinkInput = addCardForm.elements["add-card-link"];


const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

let cardPendingDeletion

enableValidation(validationConfig);

const api = new Api(apiConfig);
const userInfo = new UserInfo(".profile__name",
  ".profile__subtitle",
  ".profile__avatar",
  () => api.fetchUserInfo(),
  ({name, about}) => api.editProfile(name, about));
const cardSection = new Section({
  renderer: card => {
    const cardElement = new Card(card, cardTemplateSelector, () => {
      const photoPopup = new PopupWithImage(".popup_type_photo");
      photoPopup.setEventListeners();
      photoPopup.open(card);
    }, (cardElement) => {
      if (!likeButton.classList.contains("card__like-button_active")) {
        api.likeCard(card._id)
          .then(card => {
            cardElement.likeCard(card)
          })
          .catch(err => console.log(err));
      } else {
        api.dislikeCard(card._id)
          .then(card => {
            cardElement.dislikeCard(card)
          })
          .catch(err => console.log(err));
      }
    }, () => {
      cardPendingDeletion = cardElement;
      deleteCardPopup.open();
    }, card.likes.some(likeUser => likeUser._id === userInfo.getUserInfo()._id), userInfo.getUserInfo()._id === card.owner._id);
    return cardElement.generate();
  },
}, ".cards");

const deleteCardPopup = new PopupWithForm(".popup_type_delete-card", inputValues => {
  api.deleteCard(cardPendingDeletion.card._id)
    .then(() => {
      cardPendingDeletion.delete();
      deleteCardPopup.close();
    })
    .catch(err => console.log(err));
});

const editProfilePopup = new PopupWithForm(".popup_type_edit-profile", inputValues => {
  editProfileSubmitButton.textContent = "Сохранение...";
  console.log(inputValues);
  userInfo.setUserInfo({name: inputValues["edit-profile-name"], about: inputValues["edit-profile-subtitle"]})
    .finally(() => {
      editProfileSubmitButton.textContent = "Сохранить";
    });
  editProfilePopup.close();
});

const addCardPopup = new PopupWithForm(".popup_type_add-card", inputValues => {
  const card = {
    name: addCardNameInput.value,
    link: addCardLinkInput.value,
  };
  addCardSubmitButton.textContent = "Сохранение...";
  api.addCard(card)
    .then(card => {
      cardSection.addItem(card);
      getCards().unshift(card);
      formValidators["add_card"].validateForm();
      addCardPopup.close();
    })
    .catch(err => console.log(err));
});

const updateAvatarPopup = new PopupWithForm(".popup_type_update-avatar", inputValues => {
  updateAvatarSubmitButton.textContent = "Сохранение...";
  api.updateAvatar(inputValues["update-avatar-link"])
    .then(user => {
      userInfo.setUserInfo(user)
        .finally(() => {
          updateAvatarSubmitButton.textContent = "Сохранить";
        });
      updateAvatarPopup.close();
    })
    .catch(err => console.log(err));
});

editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
deleteCardPopup.setEventListeners();
updateAvatarPopup.setEventListeners();
const formValidators = {};

const handleEditProfileButtonClick = () => {
  formValidators["edit_profile"].resetValidation();
  editProfilePopup.open();
  editProfileNameInput.value = userInfo.getUserInfo().name;
  editProfileSubtitleInput.value = userInfo.getUserInfo().about;
  formValidators["edit_profile"].validateForm();
}

const handleUpdateAvatarButtonClick = () => {
  formValidators["update_profile"].resetValidation();
  updateAvatarPopup.open();
  updateAvatarLinkInput.value = profileAvatar.src;
  formValidators["update_profile"].validateForm();
}

const handleAddCardButtonClick = () => {
  formValidators["add_card"].resetValidation();
  addCardPopup.open();
  formValidators["add_card"].validateForm();
}

editProfileButton.addEventListener("click", handleEditProfileButtonClick);
profileAvatarButton.addEventListener("click", handleUpdateAvatarButtonClick);
addCardButton.addEventListener("click", handleAddCardButtonClick);

Promise.all([userInfo.fetchUserInfo(), api.fetchCards()])
  .then(([fetchedUser, fetchedCards]) => {
    userInfo.render();
    setCards(fetchedCards);
    cardSection.renderItems(fetchedCards);
  })
  .catch(err => console.log(err));
