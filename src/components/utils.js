import {profileAvatar, profileNameEl, profileSubtitleEl} from "./constants";
import {cardContainer, createCardElement} from "./card";

let user, cards, deleteCardId;

export const getUser = () => user;

export const getDeleteCardId = () => deleteCardId;

export const setDeleteCardId = id => deleteCardId = id;

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
