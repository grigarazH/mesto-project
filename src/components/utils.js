import {profileAvatar, profileNameEl, profileSubtitleEl} from "./constants";
import {cardContainer, createCardElement} from "./Card";

let user, cards, deleteCardId;

// Получение локальной информации о пользователе
export const getUser = () => user;

// Запись локальной информации о пользователе
export const setUser = newUser => {
  user = newUser;
  profileNameEl.textContent = user.name;
  profileSubtitleEl.textContent = user.about;
  profileAvatar.src = user.avatar;
}

// Получение id удаляемой карточки
export const getDeleteCardId = () => deleteCardId;

// Запись id удаляемой карточки
export const setDeleteCardId = id => deleteCardId = id;

// Получение локальной информации о карточках
export const getCards = () => cards;

// Запись локальной информации о карточках
export const setCards = fetchedCards => {
  cardContainer.textContent = "";
  cards = fetchedCards
  cards.forEach(card => {
    cardContainer.appendChild(createCardElement(card));
  });
}
