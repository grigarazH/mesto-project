import {openPhotoPopup, openPopup, popups} from "./modal";
import {dislikeCard, getCards, likeCard} from "./api";
import {getUser, setCards, setDeleteCardId} from "./index";

export const cardContainer = document.querySelector(".cards");

// Принимает объект карточки с параметрами link и name. Возвращает html-элемент карточки.
export const createCardElement = card => {
  const cardTemplate = document.querySelector("#card_template");
  const cardElement = cardTemplate.content.firstElementChild.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardImageContainer = cardElement.querySelector(".card__image-container")
  const cardTitle = cardElement.querySelector(".card__title");
  const likeAmountElement = cardElement.querySelector(".card__like-amount");
  cardImage.src = card.link;
  cardImage.alt = `Фотография места ${card.name}`;
  likeAmountElement.textContent = card.likes.length;
  cardImageContainer.addEventListener("click", () => openPhotoPopup(card));
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    console.log(likeButton);
    if(!likeButton.classList.contains("card__like-button_active")) {
      likeCard(card._id)
        .then(() => {
          return getCards();
        })
        .then(fetchedCards => {
          console.log(fetchedCards);
          setCards(fetchedCards)
        })
        .catch(err => console.log(err));
    } else {
      dislikeCard(card._id)
        .then(() => {
          return getCards();
        })
        .then(fetchedCards => {
          console.log(fetchedCards);
          setCards(fetchedCards);
        })
        .catch(err => console.log(err));
    }
  });
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    setDeleteCardId(card._id);
    openPopup(popups.deleteCardPopup);
  });
  cardTitle.textContent = card.name;
  return cardElement;
}



