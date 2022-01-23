import {openPhotoPopup} from "./modal";

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
    toggleLikeButton(likeButton);
  });
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  cardTitle.textContent = card.name;
  return cardElement;
}

// Изменяет состояние кнопки лайка
const toggleLikeButton = button => {
  button.classList.toggle("card__like-button_active");
}


