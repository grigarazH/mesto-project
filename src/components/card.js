/*
import {openPhotoPopup, openPopup, popups} from "./modal";
import {dislikeCard, fetchCards, likeCard} from "./api";
import {getUser, setCards, setDeleteCardId} from "./utils";

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
  if(card.likes.some(likeUser => likeUser._id === getUser()._id)) {
    likeButton.classList.add("card__like-button_active");
  } else {
    likeButton.classList.remove("card__like-button_active");
  }
  likeButton.addEventListener("click", () => {
    handleLikeButtonClick(likeButton, card, likeAmountElement);
  });
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    setDeleteCardId(card._id);
    openPopup(popups.deleteCardPopup);
  });
  if(card.owner._id === getUser()._id) {
    deleteButton.classList.remove("card__delete-button_hidden");
  } else {
    deleteButton.classList.add("card__delete-button_hidden");
  }
  cardTitle.textContent = card.name;
  return cardElement;
}

const handleLikeButtonClick = (likeButton, card, likeAmountElement) => {
  if(!likeButton.classList.contains("card__like-button_active")) {
    likeCard(card._id)
      .then(card => {
        likeAmountElement.textContent = card.likes.length;
        likeButton.classList.add("card__like-button_active");
      })
      .catch(err => console.log(err));
  } else {
    dislikeCard(card._id)
      .then(card => {
        likeAmountElement.textContent = card.likes.length;
        likeButton.classList.remove("card__like-button_active");
      })
      .catch(err => console.log(err));
  }
}



*/

export default class Card {
  constructor(card, templateSelector, handleCardClick, handleLikeClick, handleDeleteClick) {
    this._card = card;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getElement() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._element.addEventListener('click', () => this._handleCardClick());
    const likeButton = this._element.querySelector('.card__like-button');
    const deleteButton = this._element.querySelector('.card__delete-button');
    const likeAmount = this._element.querySelector('.card__like-amount');
    likeButton.addEventListener('click', () => this._handleLikeClick(likeButton, likeAmount));
    deleteButton.addEventListener('click', () => this._handleDeleteClick());
  }

  generate() {
    this._element = this._getElement();
    this._element.querySelector('.card__title').textContent = this._card.title;
    this._element.querySelector('.card__image').src = this._card.link;
    this._element.querySelector('.card__image').alt = this._card.title;
    this._setEventListeners();
    return this._element;
  }
}
