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

export const getCards = () => cards;

export const setCards = fetchedCards => {
  console.log("setting cards");
  cardContainer.textContent = "";
  cards = fetchedCards
  cards.forEach(card => {
    const cardElement = cardContainer.appendChild(createCardElement(card));
    const likeButton = cardElement.querySelector(".card__like-button");
    if(card.likes.some(likeUser => likeUser._id === user._id)) {
      likeButton.classList.add("card__like-button_active");
    } else {
      likeButton.classList.remove("card__like-button_active");
    }
  });
}
